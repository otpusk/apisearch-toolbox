import { call, put, select } from 'redux-saga/effects';
import { getToursOffer } from '@otpusk/json-api';

import { getToken, getLang } from '../../auth/selectors';

import { offersActions } from '../actions';
import { ALIVE_OFFER_STATUS, EXPIRED_OFFER_STATUS } from '../constants';

export function* getOfferSaga (offerID, fresh = false, currency) {
    const lang = yield select(getLang);
    const token = yield select(getToken);
    const offer = yield call(getToursOffer, token, offerID, fresh, currency, lang);

    if (offer.error) {
        throw new Error(offer.error);
    }

    return offer;
}

export function* bootstrapOfferSaga ({ payload: { offerId, fresh, currency }}) {
    yield put(offersActions.setOfferStatus(offerId, 'pending'));

    try {
        const offer = yield call(getOfferSaga, offerId, fresh, currency);

        yield put(offersActions.setOffer(offer));
        yield put(offersActions.setOfferStatus(offer.id, ALIVE_OFFER_STATUS));
        yield put(offersActions.getOfferSuccess(offerId));
    } catch (error) {
        yield put(offersActions.setOfferStatus(offerId, EXPIRED_OFFER_STATUS));
        yield put(offersActions.getOfferFail(error, offerId));
    }
}
