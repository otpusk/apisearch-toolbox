import { call, put, select } from 'redux-saga/effects';
import { getToursActual } from '@otpusk/json-api';
import * as R from 'ramda';

import { offersActions } from '../../actions';
import { ACTUALIZED_OFFER_STATUS } from '../../constants';

const getTextStatusByCode = (code) => R.call(
    R.cond([
        [R.equals(5), R.always(ACTUALIZED_OFFER_STATUS.ACTUALIZED)],
        [R.equals(4), R.always(ACTUALIZED_OFFER_STATUS.UPDATED)],
        [R.equals(3), R.always(ACTUALIZED_OFFER_STATUS.NEW_PRICE)],
        [R.equals(2), R.always(ACTUALIZED_OFFER_STATUS.NOT_FOUND)],
        [R.equals(1), R.always(ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION)],
        [R.equals(0), R.always(ACTUALIZED_OFFER_STATUS.INVALID_REQUEST)]
    ]),
    code
);

export function* actualizeOfferWorker ({ payload: offerID }) {
    const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));

    yield put(offersActions.startActualizeOffer(offerID));

    try {
        const { code, offer: nextOffer } = yield call(getToursActual, token, offerID);

        yield put(offersActions.setActualizedStatus(offerID, getTextStatusByCode(code)));
        nextOffer && (yield put(offersActions.setActualizedOffer(offerID, nextOffer)));
    } catch (error) {
        console.log(error);

        yield put(offersActions.setActualizedStatus(offerID, ACTUALIZED_OFFER_STATUS.INVALID_REQUEST));
        yield put(offersActions.failActualizedOffer(offerID));
    } finally {
        yield put(offersActions.endActualizeOffer(offerID));
    }

}
