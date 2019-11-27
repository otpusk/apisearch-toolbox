"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excursionsWatchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _getExcursionWorker = require("./workers/getExcursionWorker");

// Core
// Instruments
var excursionsWatchers = Object.freeze({
  getExcursionWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getExcursionWatcher() {
    return regeneratorRuntime.wrap(function getExcursionWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.excursionsActions.getExcursion, _getExcursionWorker.getExcursionWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getExcursionWatcher);
  })
});
exports.excursionsWatchers = excursionsWatchers;