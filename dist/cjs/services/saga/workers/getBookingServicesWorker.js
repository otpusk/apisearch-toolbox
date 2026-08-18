"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBookingServicesWorker = getBookingServicesWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _ramda = require("ramda");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
var _helpers = require("../../helpers");
function getBookingServicesWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      offerID,
      currency
    } = payload;
    const lang = yield (0, _effects.select)(_selectors.getLang);
    const tokenAsObject = yield (0, _effects.select)(_selectors.getToken);
    try {
      const services = yield (0, _effects.call)(_jsonApi.getToursBookServices, (0, _ramda.mergeAll)([tokenAsObject, {
        currencyLocal: currency,
        offerId: offerID,
        lang
      }]));
      yield (0, _effects.put)(_actions.servicesActions.setBookingServices((0, _helpers.createBookingServicesKey)(offerID, currency), services));
    } catch (error) {
      console.log(error);
      yield (0, _effects.put)(_actions.servicesActions.getBookingServicesFail(error));
    }
  }();
}