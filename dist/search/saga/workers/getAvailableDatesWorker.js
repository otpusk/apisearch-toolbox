"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailableDatesWorker = getAvailableDatesWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
var _helpers = require("../../helpers");
function getAvailableDatesWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      countryID,
      departureID
    } = payload;
    const token = yield (0, _effects.select)(_selectors.getToken);
    try {
      const dates = yield (0, _effects.call)(_jsonApi.getToursDates, token, {
        to: countryID,
        from: departureID
      });
      yield (0, _effects.put)(_actions.searchActions.getAvailableDatesSuccess((0, _helpers.generateAvailableDatesKey)(countryID, departureID), dates));
    } catch (error) {
      console.log(error);
      yield (0, _effects.put)(_actions.searchActions.getAvailableDatesFail(error));
    }
  }();
}