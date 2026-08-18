"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlightPortWorker = getFlightPortWorker;
var _effects = require("redux-saga/effects");
var _actions = require("../../actions");
var _jsonApi = require("@otpusk/json-api");
// Core

// Instruments

function getFlightPortWorker(_ref) {
  let {
    payload: iata
  } = _ref;
  return function* () {
    try {
      const {
        token,
        lang
      } = yield (0, _effects.select)(_ref2 => {
        let {
          auth
        } = _ref2;
        return {
          token: auth.getIn(['otpusk', 'token']),
          lang: auth.getIn(['otpusk', 'lang'], 'rus')
        };
      });
      const port = yield (0, _effects.call)(_jsonApi.getToursFlightPort, token, iata, {
        lang
      });
      yield (0, _effects.put)(_actions.geoActions.getFlightPortSuccess(iata, port));
    } catch (error) {
      yield (0, _effects.put)(_actions.geoActions.getFlightPortFail(error));
    }
  }();
}