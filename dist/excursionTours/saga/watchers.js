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
var watchers = Object.freeze({
  getExcursionWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getExcursionWatcher() {
    return regeneratorRuntime.wrap(function getExcursionWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getTour, _getTourWorker.getTourWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getExcursionWatcher);
  })
});
exports.watchers = watchers;