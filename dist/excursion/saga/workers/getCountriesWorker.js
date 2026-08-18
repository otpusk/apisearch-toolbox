"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountriesWorker = getCountriesWorker;
var _effects = require("redux-saga/effects");
var _excursionApi = require("@otpusk/excursion-api");
var _actions = require("../../actions");
var _selectors = require("../../../auth/selectors");
function* getCountriesWorker() {
  try {
    const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
    const countries = yield (0, _effects.call)(_excursionApi.getCountries, langAsQuery);
    yield (0, _effects.put)(_actions.actions.getCountriesSuccess(countries));
  } catch (error) {
    yield (0, _effects.put)(_actions.actions.getCountriesFail(error));
  }
}