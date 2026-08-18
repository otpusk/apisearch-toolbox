"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationDataWorker = getLocationDataWorker;
var _effects = require("redux-saga/effects");
var _actions = require("../../actions");
var _jsonApi = require("@otpusk/json-api");
// Core

// Instruments

function getLocationDataWorker(_ref) {
  let {
    payload: {
      id
    }
  } = _ref;
  return function* () {
    try {
      const token = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'token']));
      const data = yield (0, _effects.call)(_jsonApi.getToursGeoById, token, id, {
        with: 'price',
        nsv: 1
      });
      yield (0, _effects.put)(_actions.geoActions.getLocationDataSuccess(id, data));
    } catch (error) {
      yield (0, _effects.put)(_actions.geoActions.getLocationDataFail(error));
    }
  }();
}