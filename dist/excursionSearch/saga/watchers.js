"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _runSearchWorker = require("./workers/runSearchWorker");

// Core
// Instruments
var watchers = Object.freeze({
  runSearchWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function runSearchWatcher() {
    return regeneratorRuntime.wrap(function runSearchWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.runSearch, _runSearchWorker.runSearchWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, runSearchWatcher);
  })
});
exports.watchers = watchers;