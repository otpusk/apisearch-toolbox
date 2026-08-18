import { call, put, select } from 'redux-saga/effects';
import { getToursOffer } from '@otpusk/json-api';
import { getToken, getLang } from '../../auth/selectors';
import { offersActions } from '../actions';
import { ALIVE_OFFER_STATUS, EXPIRED_OFFER_STATUS } from '../constants';
import { extractDataFromOfferKey, isOfferKey } from "../helpers";
export function getOfferSaga(offerID) {
  let fresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let currency = arguments.length > 2 ? arguments[2] : undefined;
  let withShortCode = arguments.length > 3 ? arguments[3] : undefined;
  return function* () {
    const lang = yield select(getLang);
    const token = yield select(getToken);
    const offer = yield call(getToursOffer, token, offerID, fresh, currency, lang, withShortCode);
    if (offer.error) {
      throw new Error(offer.error);
    }
    return offer;
  }();
}
export function bootstrapOfferSaga(_ref) {
  let {
    payload: {
      offerId,
      fresh,
      currency,
      withShortCode
    }
  } = _ref;
  return function* () {
    const {
      id
    } = isOfferKey(offerId) ? extractDataFromOfferKey(offerId) : {
      id: offerId
    };
    yield put(offersActions.setOfferStatus(offerId, 'pending'));
    try {
      const offer = yield call(getOfferSaga, id, fresh, currency, withShortCode);
      yield put(offersActions.setOffer(offerId, offer));
      yield put(offersActions.setOfferStatus(offerId, ALIVE_OFFER_STATUS));
      yield put(offersActions.getOfferSuccess(offerId));
    } catch (error) {
      yield put(offersActions.setOfferStatus(offerId, EXPIRED_OFFER_STATUS));
      yield put(offersActions.getOfferFail(error, offerId));
    }
  }();
}