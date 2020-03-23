"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operatorsWatchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("./../actions");

var _workers = require("./workers");

// actions
var operatorsWatchers = Object.freeze({
  getOperators:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getOperators() {
    return regeneratorRuntime.wrap(function getOperators$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.operatorsActions.getOperators, _workers.getOperatorsWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getOperators);
  })
});
exports.operatorsWatchers = operatorsWatchers;