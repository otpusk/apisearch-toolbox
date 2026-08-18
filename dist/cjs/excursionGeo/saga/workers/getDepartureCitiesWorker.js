"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepartureCitiesWorker = getDepartureCitiesWorker;
var _effects = require("redux-saga/effects");
var _excursionApi = require("@otpusk/excursion-api");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
function getDepartureCitiesWorker(_ref) {
  let {
    payload: countryId
  } = _ref;
  return function* () {
    try {
      const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
      const cities = yield (0, _effects.call)(_excursionApi.getFilterDeparture, langAsQuery);
      yield (0, _effects.put)(_actions.actions.getDepartureCitiesSuccess(countryId, cities));
    } catch (error) {
      yield (0, _effects.put)(_actions.actions.getDepartureCitiesFail(error));
    }
  }();
}