"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepartureCitiesWorker = getDepartureCitiesWorker;
var _effects = require("redux-saga/effects");
var _actions = require("../../actions");
var _jsonApi = require("@otpusk/json-api");
// Core

// Instruments

function getDepartureCitiesWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      geoID,
      methodVersion
    } = payload;
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
      const departures = yield (0, _effects.call)(_jsonApi.getToursDepartureCities, token, {
        geoId: geoID,
        lang
      }, methodVersion);
      yield (0, _effects.put)(_actions.geoActions.getDepartureCitiesSuccess(geoID, departures));
    } catch (error) {
      yield (0, _effects.put)(_actions.geoActions.getDepartureCitiesFail(error));
    }
  }();
}