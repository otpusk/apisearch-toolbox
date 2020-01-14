import { call, put, select } from 'redux-saga/effects';

import { offersActions } from '../../actions';
import { getToursValidate } from '@otpusk/json-api/dist';

export function* validateOfferAdditionalCostsWorker ({ payload: { offerId }}) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));

        console.log('[WORKER_token]:', token);
        const validatedTour = yield call(getToursValidate, token, offerId);

        yield put(offersActions.validateOfferAdditionalCostsSuccess(offerId, validatedTour));
        console.log('[SUCCESS_ACTION]:', { offerId, validatedTour });
    } catch (error) {
        console.log('[ERROR-WORKER]:', error);
        yield put(offersActions.validateOfferAdditionalCostsFail(error));
    }
}
