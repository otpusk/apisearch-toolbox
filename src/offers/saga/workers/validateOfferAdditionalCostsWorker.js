import { call, put, select } from 'redux-saga/effects';

import { offersActions } from '../../actions';
import { getToursValidate } from '@otpusk/json-api/dist';

export function* validateOfferAdditionalCostsWorker ({ payload: { offerId }}) {
    try {
        yield put(offersActions.setOfferAdditionalCostsStatus(offerId, true));
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));

        const validatedTour = yield call(getToursValidate, token, offerId);

        yield put(offersActions.setOfferAdditionalCostsStatus(offerId, false));
        yield put(offersActions.validateOfferAdditionalCostsSuccess(offerId, validatedTour));
    } catch (error) {
        console.log('[ERROR_VALIDATE_OFFER_ADD_COSTS]:', { offerId, err: error.message });
        yield put(offersActions.setOfferAdditionalCostsStatus(offerId, false));
        yield put(offersActions.validateOfferAdditionalCostsFail(offerId, error.message));
    }
}
