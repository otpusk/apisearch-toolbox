"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotelsMarkersWorker = getHotelsMarkersWorker;
var _effects = require("redux-saga/effects");
var _actions = require("../../actions");
var _jsonApi = require("@otpusk/json-api");
// Core

// Instruments

function getHotelsMarkersWorker(_ref) {
  let {
    payload: {
      countryId,
      cityId,
      center,
      radius
    }
  } = _ref;
  return function* () {
    try {
      const token = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'token']));
      const markers = yield (0, _effects.call)(_jsonApi.getToursHotelsMarkers, token, countryId, cityId, {
        center,
        radius
      });
      yield (0, _effects.put)(_actions.hotelsActions.getHotelsMarkersSuccess(markers));
    } catch (error) {
      yield (0, _effects.put)(_actions.hotelsActions.getHotelsMarkersFail(error));
    }
  }();
}