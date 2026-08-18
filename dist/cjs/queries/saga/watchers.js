"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queriesWatchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _workers = require("./workers");
// Core

// Instruments

const queriesWatchers = exports.queriesWatchers = Object.freeze({
  *compileQueryStringWatcher() {
    yield (0, _effects.takeEvery)(_actions.queriesActions.compileQueryString, _workers.compileQueryStringWorker);
  },
  *parseQueryStringWatcher() {
    yield (0, _effects.takeEvery)(_actions.queriesActions.parseQueryString, _workers.parseQueryStringWorker);
  }
});