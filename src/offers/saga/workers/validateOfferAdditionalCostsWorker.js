import { call, put, select } from 'redux-saga/effects';

import { offersActions } from '../../actions';
import { getToursValidate } from '@otpusk/json-api/dist';

export function* validateOfferAdditionalCostsWorker ({ payload: { offerId }}) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));

        const { status, denormalizedOffer } = yield call(getToursValidate, token, offerId);

        console.log('validateOfferAdditionalCostsWorker offer', { offerId, status, denormalizedOffer });
        yield put(offersActions.validateOfferAdditionalCostsSuccess(offerId, status, denormalizedOffer));
    } catch (error) {
        yield put(offersActions.validateOfferAdditionalCostsFail(error));
    }
}
