"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSimilarHotelsWorker = getSimilarHotelsWorker;
var _effects = require("redux-saga/effects");
var _actions = require("../../actions");
var _jsonApi = require("@otpusk/json-api");
// Core

// Instruments

function getSimilarHotelsWorker(_ref) {
  let {
    payload: hotelId
  } = _ref;
  return function* () {
    try {
      const token = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'token']));
      const similar = yield (0, _effects.call)(_jsonApi.getToursSimilar, token, hotelId, 9);
      yield (0, _effects.put)(_actions.hotelsActions.getSimilarHotelsSuccess(hotelId, similar));
    } catch (error) {
      yield (0, _effects.put)(_actions.hotelsActions.getSimilarHotelsFail(error));
    }
  }();
}