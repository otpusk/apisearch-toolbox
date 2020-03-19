"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchWatchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _workers = require("./workers");

// Core
// Instruments
var searchWatchers = Object.freeze({
  runSearchWatcher: /*#__PURE__*/regeneratorRuntime.mark(function runSearchWatcher() {
    return regeneratorRuntime.wrap(function runSearchWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.searchActions.runSearch, _workers.runSearchWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, runSearchWatcher);
  }),
  submitSearchWatcher: /*#__PURE__*/regeneratorRuntime.mark(function submitSearchWatcher() {
    return regeneratorRuntime.wrap(function submitSearchWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.searchActions.submitSearch, _workers.submitSearchWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, submitSearchWatcher);
  }),
  getPriceChartWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getPriceChartWatcher() {
    return regeneratorRuntime.wrap(function getPriceChartWatcher$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.takeEvery)(_actions.searchActions.getPriceChart, _workers.getPriceChartWorker);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, getPriceChartWatcher);
  })
});
exports.searchWatchers = searchWatchers;