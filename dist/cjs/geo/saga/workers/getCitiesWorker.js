"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCitiesWorker = getCitiesWorker;
var _effects = require("redux-saga/effects");
var _actions = require("../../actions");
var _jsonApi = require("@otpusk/json-api");
// Core

// Instruments

function getCitiesWorker(_ref) {
  let {
    payload: {
      countryId,
      options = {
        'with': 'price'
      }
    }
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
      const cities = yield (0, _effects.call)(_jsonApi.getToursCities, token, countryId, {
        lang,
        ...options
      });
      yield (0, _effects.put)(_actions.geoActions.getCitiesSuccess(countryId, cities));
    } catch (error) {
      yield (0, _effects.put)(_actions.geoActions.getCitiesFail(error));
    }
  }();
}