"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestsWorker = getSuggestsWorker;
var _effects = require("redux-saga/effects");
var _excursionApi = require("@otpusk/excursion-api");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
function getSuggestsWorker(_ref) {
  let {
    payload: word
  } = _ref;
  return function* () {
    try {
      const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
      const suggestions = yield (0, _effects.call)(_excursionApi.getSuggest, {
        ...langAsQuery,
        word
      });
      yield (0, _effects.put)(_actions.actions.getSuggestsSuccess(word, suggestions));
    } catch (error) {
      yield (0, _effects.put)(_actions.actions.getSuggestsFail(error));
    }
  }();
}