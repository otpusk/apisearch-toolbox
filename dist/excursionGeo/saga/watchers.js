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
var watchers = Object.freeze({
  getSuggestsWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getSuggestsWatcher() {
    return regeneratorRuntime.wrap(function getSuggestsWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getSuggests, _getSuggestsWorker.getSuggestsWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getSuggestsWatcher);
  }),
  getDepartureCitiesWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getDepartureCitiesWatcher() {
    return regeneratorRuntime.wrap(function getDepartureCitiesWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getDepartureCities, _getDepartureCitiesWorker.getDepartureCitiesWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, getDepartureCitiesWatcher);
  })
});
exports.watchers = watchers;