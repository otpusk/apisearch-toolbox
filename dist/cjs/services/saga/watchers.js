"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesWatchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _getServicesWorker = require("./workers/getServicesWorker");
var _getBookingServicesWorker = require("./workers/getBookingServicesWorker");
const servicesWatchers = exports.servicesWatchers = Object.freeze({
  *getServicesWatcher() {
    yield (0, _effects.takeEvery)([_actions.servicesActions.getServices, _actions.servicesActions.getAllServices], _getServicesWorker.getServicesWorker);
  },
  *getBookingServicesWatcher() {
    yield (0, _effects.takeEvery)(_actions.servicesActions.getBookingServices, _getBookingServicesWorker.getBookingServicesWorker);
  }
});