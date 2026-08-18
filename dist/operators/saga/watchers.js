"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operatorsWatchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("./../actions");
var _workers = require("./workers");
// actions

const operatorsWatchers = exports.operatorsWatchers = Object.freeze({
  *getOperators() {
    yield (0, _effects.takeEvery)(_actions.operatorsActions.getOperators, _workers.getOperatorsWorker);
  },
  *getCurrencyRates() {
    yield (0, _effects.takeEvery)(_actions.operatorsActions.getCurrencyRates, _workers.getCurrencyRatesWorker);
  }
});