import { call, put, select } from 'redux-saga/effects';

import { offersActions } from '../../actions';
import { getToursValidate } from '@otpusk/json-api/dist';

export function* validateOfferAdditionalCostsWorker ({ payload: { offerId, queryId }}) {
    try {
        const { departure, isBus } = yield select(({ queries }) => ({
            departure: queries.getIn([queryId, 'departure']),
            isBus:     queries.getIn([queryId, 'transport', 'bus'], false),
        }));

        yield put(offersActions.setOfferAdditionalCostsStatus(offerId, true));
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));

        const validatedTour = yield call(getToursValidate, { ...isBus ? { ...token, city: Number(departure) } : token }, offerId);

        yield put(offersActions.setOfferAdditionalCostsStatus(offerId, false));
        yield put(offersActions.validateOfferAdditionalCostsSuccess(offerId, validatedTour));
    } catch (error) {
        yield put(offersActions.setOfferAdditionalCostsStatus(offerId, false));
        if (error.message && error.message.includes('timed out')) {
            yield put(offersActions.validateOfferAdditionalCostsSuccess(offerId, {
                status:  12,
                message: 'timed out',
                price:   { usd: 0, eur: 0, uah: 0 },
            }));
        } else {
            yield put(offersActions.validateOfferAdditionalCostsFail(offerId, error));
        }
    }
}
