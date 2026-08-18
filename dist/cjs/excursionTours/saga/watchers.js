"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _getTourWorker = require("./workers/getTourWorker");
// Core

// Instruments

const watchers = exports.watchers = Object.freeze({
  *getExcursionWatcher() {
    yield (0, _effects.takeEvery)(_actions.actions.getTour, _getTourWorker.getTourWorker);
  }
});