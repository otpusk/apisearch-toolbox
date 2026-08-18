"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTourWorker = getTourWorker;
var _effects = require("redux-saga/effects");
var _excursionApi = require("@otpusk/excursion-api");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
function getTourWorker(_ref) {
  let {
    payload: tourId
  } = _ref;
  return function* () {
    const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
    try {
      const tour = yield (0, _effects.call)(_excursionApi.getExcursion, tourId, langAsQuery);
      yield (0, _effects.put)(_actions.actions.getTourSuccess(tourId, tour));
    } catch (error) {
      yield (0, _effects.put)(_actions.actions.getTourFail(error));
    }
  }();
}