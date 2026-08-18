"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _getSuggestsWorker = require("./workers/getSuggestsWorker");
var _getDepartureCitiesWorker = require("./workers/getDepartureCitiesWorker");
// Core

// Instruments

const watchers = exports.watchers = Object.freeze({
  *getSuggestsWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getSuggests, _getSuggestsWorker.getSuggestsWorker);
  },
  *getDepartureCitiesWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getDepartureCities, _getDepartureCitiesWorker.getDepartureCitiesWorker);
  }
});