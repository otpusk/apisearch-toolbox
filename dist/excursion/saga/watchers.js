"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _getMainPageWorker = require("./workers/getMainPageWorker");
var _getCountriesWorker = require("./workers/getCountriesWorker");
// Core

// Instruments

const watchers = exports.watchers = Object.freeze({
  *getMainpageWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getMainpage, _getMainPageWorker.getMainpageWorker);
  },
  *getCountriesWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getCountries, _getCountriesWorker.getCountriesWorker);
  }
});