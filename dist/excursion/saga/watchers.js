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
var watchers = Object.freeze({
  getMainpageWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getMainpageWatcher() {
    return regeneratorRuntime.wrap(function getMainpageWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getMainpage, _getMainPageWorker.getMainpageWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getMainpageWatcher);
  }),
  getCountriesWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getCountriesWatcher() {
    return regeneratorRuntime.wrap(function getCountriesWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getCountries, _getCountriesWorker.getCountriesWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, getCountriesWatcher);
  })
});
exports.watchers = watchers;