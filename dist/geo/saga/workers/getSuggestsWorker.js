"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestsWorker = getSuggestsWorker;
var _effects = require("redux-saga/effects");
var _actions = require("../../actions");
var _jsonApi = require("@otpusk/json-api");
// Core

// Instruments

function getSuggestsWorker(_ref) {
  let {
    payload: key
  } = _ref;
  return function* () {
    try {
      const token = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'token']));
      const lang = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'lang'], 'rus'));
      const suggestions = yield (0, _effects.call)(_jsonApi.getToursSuggests, token, key, {
        lang,
        'with': 'price'
      });
      yield (0, _effects.put)(_actions.geoActions.getSuggestsSuccess(key, suggestions));
    } catch (error) {
      yield (0, _effects.put)(_actions.geoActions.getSuggestsFail(error));
    }
  }();
}