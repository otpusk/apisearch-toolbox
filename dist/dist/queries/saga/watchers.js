"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queriesWatchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _workers = require("./workers"); // Core
// Instruments


var queriesWatchers = Object.freeze({
  compileQueryStringWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function compileQueryStringWatcher() {
    return regeneratorRuntime.wrap(function compileQueryStringWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.queriesActions.compileQueryString, _workers.compileQueryStringWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, compileQueryStringWatcher);
  }),
  parseQueryStringWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function parseQueryStringWatcher() {
    return regeneratorRuntime.wrap(function parseQueryStringWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.queriesActions.parseQueryString, _workers.parseQueryStringWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, parseQueryStringWatcher);
  })
});
exports.queriesWatchers = queriesWatchers;