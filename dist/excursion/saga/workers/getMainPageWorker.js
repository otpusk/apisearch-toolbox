"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMainpageWorker = getMainpageWorker;
var _effects = require("redux-saga/effects");
var _excursionApi = require("@otpusk/excursion-api");
var _actions = require("../../actions");
var _selectors = require("../../../auth/selectors");
function* getMainpageWorker() {
  try {
    const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
    const categories = yield (0, _effects.call)(_excursionApi.getMainpage, langAsQuery);
    yield (0, _effects.put)(_actions.actions.getMainpageSuccess(categories));
  } catch (error) {
    yield (0, _effects.put)(_actions.actions.getMainpageFail(error));
  }
}