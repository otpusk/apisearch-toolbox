"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warmupSearchWorker = warmupSearchWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../../auth/selectors");
var _selectors2 = require("../../../queries/selectors");
var _fn = require("../../../queries/fn");
function warmupSearchWorker(_ref) {
  let {
    payload: queryID
  } = _ref;
  return function* () {
    const token = yield (0, _effects.select)(_selectors.getToken);
    const lang = yield (0, _effects.select)(_selectors.getLang);
    const query = yield (0, _effects.select)(state => (0, _selectors2.getQuery)(state, {
      queryID
    }));
    const otpQuery = (0, _fn.convertToOtpQuery)(query.set(_fn.QUERY_PARAMS.LANGUAGE, lang));
    try {
      yield (0, _effects.call)(_jsonApi.getToursStartSearch, token, otpQuery);
    } catch (error) {
      console.log(error);
    }
  }();
}