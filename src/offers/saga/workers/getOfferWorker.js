// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { offersActions } from '../../actions';
import { getToursOffer } from '@otpusk/json-api';

export function* getOfferWorker ({ payload: { offerId, fresh }}) {
    try {
        yield put(offersActions.setOfferStatus(offerId, 'pending'));

        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const offer = yield call(getToursOffer, token, offerId, fresh);

        console.log('getOfferWorker offer', offer);
        yield put(offersActions.setOffer(offer));
        yield put(offersActions.setOfferStatus(offer.id, 'alive'));
        yield put(offersActions.getOfferSuccess());
    } catch (error) {
        yield put(offersActions.setOfferStatus(offerId, 'expired'));
        yield put(offersActions.getOfferFail(error));
    }
}
