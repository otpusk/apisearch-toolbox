import { call, put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import { getToursActual } from '@otpusk/json-api';

import { getLang, getToken } from '../../auth/selectors';

import { offersActions } from '../actions';
import { ACTUALIZED_OFFER_STATUS } from '../constants';
import { isOfferKey, extractDataFromOfferKey } from '../helpers';

const getTextStatusByCode = (code) => R.call(
    R.cond([
        [R.equals(8), R.always(ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_HOTEL)],
        [R.equals(7), R.always(ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_TRANSPORT_TO)],
        [R.equals(6), R.always(ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_TRANSPORT_FROM)],
        [R.equals(5), R.always(ACTUALIZED_OFFER_STATUS.ACTUALIZED)],
        [R.equals(4), R.always(ACTUALIZED_OFFER_STATUS.UPDATED)],
        [R.equals(3), R.always(ACTUALIZED_OFFER_STATUS.NEW_PRICE)],
        [R.equals(2), R.always(ACTUALIZED_OFFER_STATUS.NOT_FOUND)],
        [R.equals(1), R.always(ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION)],
        [R.equals(0), R.always(ACTUALIZED_OFFER_STATUS.INVALID_REQUEST)]
    ]),
    code
);

const generatePeopleString = (adults, children) => R.call(
    R.pipe(
        R.flatten,
        R.filter(Boolean),
        R.join('')
    ),
    [
        adults,
        children
            ? R.map(
                (age) => age.toString().length === 2 ? age : `0${age}`,
                children
            )
            : []
    ]
);

export function* actualizeOfferSaga ({ payload: { adults, children, offerID, currency, withShortCode }}) {
    const token = yield select(getToken);
    const lang = yield select(getLang);

    yield put(offersActions.startActualizeOffer(offerID));

    try {
        const { code, offer: nextOffer, message } = yield call(
            getToursActual,
            R.mergeAll([token, { lang }]),
            isOfferKey(offerID)
                ? extractDataFromOfferKey(offerID).id
                : offerID,
            generatePeopleString(adults, children),
            currency,
            withShortCode
        );

        yield put(offersActions.setActualizedStatus(offerID, getTextStatusByCode(code)));

        if (nextOffer) {
            yield put(offersActions.setActualizedOffer(offerID, nextOffer));
        }

        message && (yield put(offersActions.setMessageByActualizedOffer(offerID, message)));
    } catch (error) {
        console.log(error);

        yield put(offersActions.setActualizedStatus(offerID, ACTUALIZED_OFFER_STATUS.INVALID_REQUEST));
        yield put(offersActions.failActualizeOffer(offerID));
    } finally {
        yield put(offersActions.endActualizeOffer(offerID));
    }

}
