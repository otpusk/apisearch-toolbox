import { call, put, select } from 'redux-saga/effects';
import { getToursOffer } from '@otpusk/json-api';

import { getToken, getLang } from '../../auth/selectors';

import { offersActions } from '../actions';
import { ALIVE_OFFER_STATUS, EXPIRED_OFFER_STATUS } from '../constants';
import { extractDataFromOfferKey, isOfferKey } from "../helpers";

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
    const { key, id } =  isOfferKey(offerId)
        ? extractDataFromOfferKey(offerId)
        : { key: offerId, id: offerId };

    yield put(offersActions.setOfferStatus(key, 'pending'));

    try {
        const offer = yield call(getOfferSaga, id, fresh, currency);

        yield put(offersActions.setOffer({ ...offer, id: key }));
        yield put(offersActions.setOfferStatus(key, ALIVE_OFFER_STATUS));
        yield put(offersActions.getOfferSuccess(key));
    } catch (error) {
        yield put(offersActions.setOfferStatus(key, EXPIRED_OFFER_STATUS));
        yield put(offersActions.getOfferFail(error, key));
    }
}
