"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _getTourWorker = require("./workers/getTourWorker");

var _getTourPageWorker = require("./workers/getTourPageWorker");

// Core
// Instruments
var watchers = Object.freeze({
  getTour:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getTour() {
    return regeneratorRuntime.wrap(function getTour$(_context) {
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
    }, getTour);
  }),
  getTourPage:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getTourPage() {
    return regeneratorRuntime.wrap(function getTourPage$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getTourPage, _getTourPageWorker.getTourPageWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, getTourPage);
  })
});
exports.watchers = watchers;