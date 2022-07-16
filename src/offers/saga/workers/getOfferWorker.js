import { call, put, select } from 'redux-saga/effects';
import { getToursOffer } from '@otpusk/json-api';

import { offersActions } from '../../actions';

import { ALIVE_OFFER_STATUS, EXPIRED_OFFER_STATUS } from '../../constants';

export function* getOfferWorker ({ payload: { offerId, fresh }}) {
    try {
        yield put(offersActions.setOfferStatus(offerId, 'pending'));

        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const offer = yield call(getToursOffer, token, offerId, fresh);

        if (offer.error) {
            throw new Error(offer.error);
        }
        yield put(offersActions.setOffer(offer));
        yield put(offersActions.setOfferStatus(offer.id, ALIVE_OFFER_STATUS));
        yield put(offersActions.getOfferSuccess(offerId));
    } catch (error) {
        yield put(offersActions.setOfferStatus(offerId, EXPIRED_OFFER_STATUS));
        yield put(offersActions.getOfferFail(error, offerId));
    }
}
