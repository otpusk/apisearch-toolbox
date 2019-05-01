// Core
import { call, put, select } from 'redux-saga/effects';
import { Range } from 'immutable';

// Instruments
import { offersActions as actions } from '/offers/actions';
import { analyticsActions } from '/analytics/actions';
import { getToursActual } from '@otpusk/json-api';
import { getOperatorById } from '@otpusk/json-api/dist/dictionary';
import { QUERY_PARAMS } from '/queries/fn';

export function* checkOfferStatusWorker ({ payload: { offerId, hotelId }}) {
    const hotel = yield select(({ hotels }) => hotels.getIn(['store', hotelId]));
    const currentOffer = yield select(({ offers }) => offers.getIn(['store', offerId]));

    try {
        const adults = yield select(({ queries }) => queries.getIn(['form', QUERY_PARAMS.ADULTS]));
        const children = yield select(
            ({ queries }) => queries.getIn(
                ['form', QUERY_PARAMS.CHILDREN],
                Range(0, currentOffer.children).toArray().map(() => Number(currentOffer.childrenAge.replace(/\D.*/, '').replace(/^(\d)$/, '0$1')))
            ));
        const tourists = `${adults}${children.map((age) => age >= 10 ? age : `0${age}`).join('')}`;

        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const { offer: freshOffer, code } = yield call(getToursActual, token, offerId, tourists);

        switch (code) {
            case 5:
                const isTouched = JSON.stringify(freshOffer.price) !== JSON.stringify(currentOffer.price);

                yield put(actions.setOfferStatus(offerId, isTouched ? 'touched' : 'fresh'));
                yield put(actions.checkOfferStatusSuccess(offerId, freshOffer));
                yield put(analyticsActions.sendEvent('Страница тура', 'Актуализация', 'Тур актуален', {
                    'dimension1': getOperatorById(currentOffer.operator).name,
                    'dimension2': hotel.country.name,
                }));
                break;
            case 4:
            case 3:
            case 2:
                yield put(actions.setOfferStatus(offerId, 'dirty'));
                yield put(actions.checkOfferStatusSuccess(offerId, freshOffer));
                yield put(analyticsActions.sendEvent('Страница тура', 'Актуализация', 'Тур не актуален', {
                    'dimension1': getOperatorById(currentOffer.operator).name,
                    'dimension2': hotel.country.name,
                }));
                break;
            default:
                throw new Error('Ошибка актуализации');
        }
    } catch (error) {
        yield put(actions.setOfferStatus(offerId, 'failed'));
        yield put(analyticsActions.sendEvent('Страница тура', 'Актуализация', 'Ошибка актуализации', {
            'dimension1': getOperatorById(currentOffer.operator).name,
            'dimension2': hotel.country.name,
        }));
        yield put(actions.checkOfferStatusFail(error));
    }
}
