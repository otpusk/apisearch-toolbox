// Core
import { call, put, select } from 'redux-saga/effects';
import { Range } from 'immutable';

// Instruments
import { offersActions as actions } from '../../actions';
import { getToursActual } from '@otpusk/json-api';
import { QUERY_PARAMS } from '../../../queries/fn';

export function* checkOfferStatusWorker ({ payload: { offerId, queryId }}) {
    const currentOffer = yield select(({ offers }) => offers.getIn(['store', offerId]));

    try {
        const adults = yield select(({ queries }) => queries.getIn([queryId, QUERY_PARAMS.ADULTS]));
        const children = yield select(
            ({ queries }) => queries.getIn(
                [queryId, QUERY_PARAMS.CHILDREN],
                Range(0, currentOffer.children).toArray().map(() => Number(currentOffer.childrenAge.replace(/\D.*/, '').replace(/^(\d)$/, '0$1')))
            ));
        const tourists = `${adults}${children.map((age) => age >= 10 ? age : `0${age}`).join('')}`;

        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const { offer: freshOffer, code } = yield call(getToursActual, token, offerId, tourists);

        switch (code) {
            //  5 - цена не изменилась,
            //  4 - цена обновлена с сохранением offerId,
            //  3 - новая цена,
            //  2 - цена не найдена,
            //  1 - ошибка соединения с туроператором,
            //  0 - неправильные входящие данные
            case 5:
                const isTouched = JSON.stringify(freshOffer.price) !== JSON.stringify(currentOffer.price);

                yield put(actions.setOfferStatus(offerId, isTouched ? 'touched' : 'fresh'));
                yield put(actions.checkOfferStatusSuccess(offerId, freshOffer));
                break;
            case 4:
            case 3:
            case 2:
                yield put(actions.setOfferStatus(offerId, 'dirty'));
                yield put(actions.checkOfferStatusSuccess(offerId, freshOffer));
                break;
            default:
                throw new Error('Ошибка актуализации');
        }
    } catch (error) {
        yield put(actions.setOfferStatus(offerId, 'failed'));
        yield put(actions.checkOfferStatusFail(error));
    }
}
