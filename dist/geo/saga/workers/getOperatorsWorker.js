"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperatorsWorker = getOperatorsWorker;
var _effects = require("redux-saga/effects");
var _immutable = require("immutable");
var _jsonApi = require("@otpusk/json-api");
var _actions = require("../../actions");
var _helpers = require("../../helpers");
function getOperatorsWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      countryId,
      departureID,
      methodVersion
    } = payload;
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
    try {
      const operators = yield (0, _effects.call)(_jsonApi.getToursOperators, token, countryId, departureID ? {
        from: departureID,
        lang
      } : {
        lang
      }, methodVersion);
      yield (0, _effects.put)(_actions.geoActions.getOperatorsSuccess((0, _helpers.generateOperatorKey)(countryId, departureID), (0, _immutable.List)(operators)));
    } catch (error) {
      console.log('error', error);
      yield (0, _effects.put)(_actions.geoActions.getOperatorsFail(error));
    }
  }();
}