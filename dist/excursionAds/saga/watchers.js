"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _getAgenciesWorker = require("./workers/getAgenciesWorker");

// Core
// Instruments
var watchers = Object.freeze({
  getOfficesWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getOfficesWatcher() {
    return regeneratorRuntime.wrap(function getOfficesWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getOffices, _getAgenciesWorker.getAgenciesWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getOfficesWatcher);
  }),
  getRegionsWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getRegionsWatcher() {
    return regeneratorRuntime.wrap(function getRegionsWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getRegions, _getAgenciesWorker.getAgenciesWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, getRegionsWatcher);
  })
});
exports.watchers = watchers;