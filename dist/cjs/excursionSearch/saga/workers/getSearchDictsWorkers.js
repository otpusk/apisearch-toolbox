"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchCategoriesWorker = getSearchCategoriesWorker;
exports.getSearchOperatorsWorker = getSearchOperatorsWorker;
exports.getSearchPricesWorker = getSearchPricesWorker;
exports.getSearchTransportsWorker = getSearchTransportsWorker;
var _effects = require("redux-saga/effects");
var _excursionApi = require("@otpusk/excursion-api");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
function* getSearchOperatorsWorker() {
  try {
    const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
    const operators = yield (0, _effects.call)(_excursionApi.getFilterOperators, langAsQuery);
    yield (0, _effects.put)(_actions.actions.getSearchOperatorsSuccess(0, operators));
  } catch (error) {
    yield (0, _effects.put)(_actions.actions.getSearchOperatorsFail(error));
  }
}
function* getSearchTransportsWorker() {
  try {
    const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
    const transports = yield (0, _effects.call)(_excursionApi.getFilterTransport, langAsQuery);
    yield (0, _effects.put)(_actions.actions.getSearchTransportsSuccess(0, transports));
  } catch (error) {
    yield (0, _effects.put)(_actions.actions.getSearchTransportsFail(error));
  }
}
function* getSearchCategoriesWorker() {
  try {
    const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
    const categories = yield (0, _effects.call)(_excursionApi.getFilterCategories, langAsQuery);
    yield (0, _effects.put)(_actions.actions.getSearchCategoriesSuccess(0, categories));
  } catch (error) {
    yield (0, _effects.put)(_actions.actions.getSearchCategoriesFail(error));
  }
}
function* getSearchPricesWorker() {
  try {
    const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
    const prices = yield (0, _effects.call)(_excursionApi.getFilterPrice, langAsQuery);
    yield (0, _effects.put)(_actions.actions.getSearchPricesSuccess(0, prices));
  } catch (error) {
    yield (0, _effects.put)(_actions.actions.getSearchPricesFail(error));
  }
}