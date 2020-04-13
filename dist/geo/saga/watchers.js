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

// Core
// Instruments
var geoWatchers = Object.freeze({
  getSuggestsWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getSuggestsWatcher() {
    return regeneratorRuntime.wrap(function getSuggestsWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.debounce)(250, _actions.geoActions.getSuggests, _getSuggestsWorker.getSuggestsWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getSuggestsWatcher);
  }),
  getCountriesWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getCountriesWatcher() {
    return regeneratorRuntime.wrap(function getCountriesWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.geoActions.getCountries, _getCountriesWorker.getCountriesWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, getCountriesWatcher);
  }),
  getCitiesWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getCitiesWatcher() {
    return regeneratorRuntime.wrap(function getCitiesWatcher$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.takeEvery)(_actions.geoActions.getCities, _getCitiesWorker.getCitiesWorker);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, getCitiesWatcher);
  }),
  getHotelsWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getHotelsWatcher() {
    return regeneratorRuntime.wrap(function getHotelsWatcher$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _effects.takeEvery)(_actions.geoActions.getHotels, _getHotelsWorker.getHotelsWorker);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, getHotelsWatcher);
  }),
  getDepartureCitiesWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getDepartureCitiesWatcher() {
    return regeneratorRuntime.wrap(function getDepartureCitiesWatcher$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _effects.takeEvery)(_actions.geoActions.getDepartureCities, _getDepartureCitiesWorker.getDepartureCitiesWorker);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, getDepartureCitiesWatcher);
  }),
  getOperatorsWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getOperatorsWatcher() {
    return regeneratorRuntime.wrap(function getOperatorsWatcher$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _effects.takeEvery)(_actions.geoActions.getOperators, _getOperatorsWorker.getOperatorsWorker);

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, getOperatorsWatcher);
  }),
  getGeoTreeWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getGeoTreeWatcher() {
    return regeneratorRuntime.wrap(function getGeoTreeWatcher$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _effects.takeEvery)(_actions.geoActions.getGeoTree, _getGeoTreeWorker.getGeoTreeWorker);

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, getGeoTreeWatcher);
  })
});
exports.geoWatchers = geoWatchers;