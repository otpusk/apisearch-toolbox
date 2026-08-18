"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bootstrapOfferSaga = bootstrapOfferSaga;
exports.getOfferSaga = getOfferSaga;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../auth/selectors");
var _actions = require("../actions");
var _constants = require("../constants");
var _helpers = require("../helpers");
function getOfferSaga(offerID) {
  let fresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let currency = arguments.length > 2 ? arguments[2] : undefined;
  let withShortCode = arguments.length > 3 ? arguments[3] : undefined;
  return function* () {
    const lang = yield (0, _effects.select)(_selectors.getLang);
    const token = yield (0, _effects.select)(_selectors.getToken);
    const offer = yield (0, _effects.call)(_jsonApi.getToursOffer, token, offerID, fresh, currency, lang, withShortCode);
    if (offer.error) {
      throw new Error(offer.error);
    }
    return offer;
  }();
}
function bootstrapOfferSaga(_ref) {
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
    } = (0, _helpers.isOfferKey)(offerId) ? (0, _helpers.extractDataFromOfferKey)(offerId) : {
      id: offerId
    };
    yield (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'pending'));
    try {
      const offer = yield (0, _effects.call)(getOfferSaga, id, fresh, currency, withShortCode);
      yield (0, _effects.put)(_actions.offersActions.setOffer(offerId, offer));
      yield (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, _constants.ALIVE_OFFER_STATUS));
      yield (0, _effects.put)(_actions.offersActions.getOfferSuccess(offerId));
    } catch (error) {
      yield (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, _constants.EXPIRED_OFFER_STATUS));
      yield (0, _effects.put)(_actions.offersActions.getOfferFail(error, offerId));
    }
  }();
}