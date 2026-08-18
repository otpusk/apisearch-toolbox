"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsWatchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _workers = require("./workers");
// Core

// Instruments

const hotelsWatchers = exports.hotelsWatchers = Object.freeze({
  *getHotelWatcher() {
    yield (0, _effects.takeEvery)(_actions.hotelsActions.getHotel, _workers.getHotelWorker);
  },
  *getHotelsMarkersWatcher() {
    yield (0, _effects.takeEvery)(_actions.hotelsActions.getHotelsMarkers, _workers.getHotelsMarkersWorker);
  },
  *getSimilarHotelsWatcher() {
    yield (0, _effects.takeEvery)(_actions.hotelsActions.getSimilarHotels, _workers.getSimilarHotelsWorker);
  },
  *getHotelDescriptors() {
    yield (0, _effects.takeEvery)(_actions.hotelsActions.getDescriptionsByOperator, _workers.getDescriptionsByOperatorWorker);
  }
});