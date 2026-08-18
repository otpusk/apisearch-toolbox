"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotelsWorker = getHotelsWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _actions = require("../../actions");
var _helpers = require("../../helpers");
function getHotelsWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      countryId,
      withPrice,
      services,
      rating,
      methodVersion,
      withServices
    } = payload;
    try {
      const token = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'token']));
      const lang = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'lang'], 'rus'));
      const hotels = yield (0, _effects.call)(_jsonApi.getToursHotels, token, countryId, {
        lang,
        withPrice,
        services,
        rating,
        withServices
      }, methodVersion);
      const storeKey = (0, _helpers.generateHotelKey)(countryId, rating, services);
      yield (0, _effects.put)(_actions.geoActions.getHotelsSuccess(countryId, storeKey, hotels));
    } catch (error) {
      console.log(error);
      yield (0, _effects.put)(_actions.geoActions.getHotelsFail(error));
    }
  }();
}