"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _runSearchWorker = require("./workers/runSearchWorker");
var _getSearchDictsWorkers = require("./workers/getSearchDictsWorkers");
// Core

// Instruments

const watchers = exports.watchers = Object.freeze({
  *runSearchWatcher() {
    yield (0, _effects.takeEvery)([_actions.actions.runSearch, _actions.actions.runNextPageSearch], _runSearchWorker.runSearchWorker);
  },
  *getSearchOperatorsWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getSearchOperators, _getSearchDictsWorkers.getSearchOperatorsWorker);
  },
  *getSearchTransportsWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getSearchTransports, _getSearchDictsWorkers.getSearchTransportsWorker);
  },
  *getSearchCategoriesWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getSearchCategories, _getSearchDictsWorkers.getSearchCategoriesWorker);
  },
  *getSearchPricesWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getSearchPrices, _getSearchDictsWorkers.getSearchPricesWorker);
  }
});