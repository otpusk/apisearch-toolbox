import { call, put, select } from 'redux-saga/effects';
import { getToursActual } from '@otpusk/json-api';
import * as R from 'ramda';

import { offersActions } from '../../actions';
import { ACTUALIZED_OFFER_STATUS } from '../../constants';

const getTextStatusByCode = (code) => R.call(
    R.cond([
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

export function* actualizeOfferWorker ({ payload: { adults, children, offerID }}) {
    const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
    const lang = yield select((state) => state.auth.getIn(['otpusk', 'lang']));

    yield put(offersActions.startActualizeOffer(offerID));

    try {
        const { code, offer: nextOffer, message: errorMessage } = yield call(
            getToursActual,
            R.mergeAll([token, { lang }]),
            offerID,
            generatePeopleString(adults, children)
        );

        yield put(offersActions.setActualizedStatus(offerID, getTextStatusByCode(code)));
        nextOffer && (yield put(offersActions.setActualizedOffer(offerID, nextOffer)));
        errorMessage && (yield put(offersActions.setErrorMessageByActualizedOffer(offerID, errorMessage)));
    } catch (error) {
        console.log(error);

        yield put(offersActions.setActualizedStatus(offerID, ACTUALIZED_OFFER_STATUS.INVALID_REQUEST));
        yield put(offersActions.failActualizeOffer(offerID));
    } finally {
        yield put(offersActions.endActualizeOffer(offerID));
    }

}
