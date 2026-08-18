"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoWatchers = void 0;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _getSuggestsWorker = require("./workers/getSuggestsWorker");
var _getCountriesWorker = require("./workers/getCountriesWorker");
var _getCitiesWorker = require("./workers/getCitiesWorker");
var _getHotelsWorker = require("./workers/getHotelsWorker");
var _getDepartureCitiesWorker = require("./workers/getDepartureCitiesWorker");
var _getOperatorsWorker = require("./workers/getOperatorsWorker");
var _getGeoTreeWorker = require("./workers/getGeoTreeWorker");
var _getLocationDataWorker = require("./workers/getLocationDataWorker");
var _getFlightPortWorker = require("./workers/getFlightPortWorker");
// Core

// Instruments

const geoWatchers = exports.geoWatchers = Object.freeze({
  *getSuggestsWatcher() {
    yield (0, _effects.debounce)(250, _actions.geoActions.getSuggests, _getSuggestsWorker.getSuggestsWorker);
  },
  *getCountriesWatcher() {
    yield (0, _effects.takeEvery)(_actions.geoActions.getCountries, _getCountriesWorker.getCountriesWorker);
  },
  *getCitiesWatcher() {
    yield (0, _effects.takeEvery)(_actions.geoActions.getCities, _getCitiesWorker.getCitiesWorker);
  },
  *getHotelsWatcher() {
    yield (0, _effects.takeEvery)(_actions.geoActions.getHotels, _getHotelsWorker.getHotelsWorker);
  },
  *getDepartureCitiesWatcher() {
    yield (0, _effects.takeEvery)(_actions.geoActions.getDepartureCities, _getDepartureCitiesWorker.getDepartureCitiesWorker);
  },
  *getOperatorsWatcher() {
    yield (0, _effects.takeEvery)(_actions.geoActions.getOperators, _getOperatorsWorker.getOperatorsWorker);
  },
  *getGeoTreeWatcher() {
    yield (0, _effects.takeEvery)(_actions.geoActions.getGeoTree, _getGeoTreeWorker.getGeoTreeWorker);
  },
  *getLocationDataWatcher() {
    yield (0, _effects.takeEvery)(_actions.geoActions.getLocationData, _getLocationDataWorker.getLocationDataWorker);
  },
  *getFlightPortWatcher() {
    yield (0, _effects.takeEvery)(_actions.geoActions.getFlightPort, _getFlightPortWorker.getFlightPortWorker);
  }
});