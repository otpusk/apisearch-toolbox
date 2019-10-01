"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchOperatorsWorker = getSearchOperatorsWorker;
exports.getSearchTransportWorker = getSearchTransportWorker;
exports.getSearchCategoriesWorker = getSearchCategoriesWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _excursionApi = require("@otpusk/excursion-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getSearchOperatorsWorker),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(getSearchTransportWorker),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(getSearchCategoriesWorker);

function getSearchOperatorsWorker() {
  var operators;
  return regeneratorRuntime.wrap(function getSearchOperatorsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(_excursionApi.getFilterOperators);

        case 3:
          operators = _context.sent;
          _context.next = 6;
          return (0, _effects.put)(_actions.actions.getSearchOperatorsSuccess(0, operators));

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return (0, _effects.put)(_actions.actions.getSearchOperatorsFail(_context.t0));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

function getSearchTransportWorker() {
  var transport;
  return regeneratorRuntime.wrap(function getSearchTransportWorker$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_excursionApi.getFilterTransport);

        case 3:
          transport = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)(_actions.actions.getSearchTransportSuccess(transport));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 12;
          return (0, _effects.put)(_actions.actions.getSearchTransportFail(_context2.t0));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 8]]);
}

function getSearchCategoriesWorker() {
  var categories;
  return regeneratorRuntime.wrap(function getSearchCategoriesWorker$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _effects.call)(_excursionApi.getFilterCategories);

        case 3:
          categories = _context3.sent;
          _context3.next = 6;
          return (0, _effects.put)(_actions.actions.getSearchCategoriesSuccess(0, categories));

        case 6:
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 12;
          return (0, _effects.put)(_actions.actions.getSearchCategoriesFail(_context3.t0));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 8]]);
}