"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _runSearchWorker = require("./workers/runSearchWorker");

var _getSearchDictsWorkers = require("./workers/getSearchDictsWorkers");

var _getSearchCountWorker = require("./workers/getSearchCountWorker");

// Core
// Instruments
var watchers = Object.freeze({
  runSearchWatcher: /*#__PURE__*/regeneratorRuntime.mark(function runSearchWatcher() {
    return regeneratorRuntime.wrap(function runSearchWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)([_actions.actions.runSearch, _actions.actions.runNextPageSearch], _runSearchWorker.runSearchWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, runSearchWatcher);
  }),
  getSearchOperatorsWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getSearchOperatorsWatcher() {
    return regeneratorRuntime.wrap(function getSearchOperatorsWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getSearchOperators, _getSearchDictsWorkers.getSearchOperatorsWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, getSearchOperatorsWatcher);
  }),
  getSearchTransportsWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getSearchTransportsWatcher() {
    return regeneratorRuntime.wrap(function getSearchTransportsWatcher$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getSearchTransports, _getSearchDictsWorkers.getSearchTransportsWorker);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, getSearchTransportsWatcher);
  }),
  getSearchCategoriesWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getSearchCategoriesWatcher() {
    return regeneratorRuntime.wrap(function getSearchCategoriesWatcher$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getSearchCategories, _getSearchDictsWorkers.getSearchCategoriesWorker);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, getSearchCategoriesWatcher);
  }),
  getSearchPricesWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getSearchPricesWatcher() {
    return regeneratorRuntime.wrap(function getSearchPricesWatcher$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getSearchPrices, _getSearchDictsWorkers.getSearchPricesWorker);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, getSearchPricesWatcher);
  }),
  getSearchCountWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getSearchCountWatcher() {
    return regeneratorRuntime.wrap(function getSearchCountWatcher$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _effects.takeEvery)(_actions.actions.getExcursionsCount, _getSearchCountWorker.getSearchCountWorker);

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, getSearchCountWatcher);
  })
});
exports.watchers = watchers;