"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMainpageWorker = getMainpageWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _excursionApi = require("@otpusk/excursion-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getMainpageWorker);

function getMainpageWorker() {
  var categories;
  return regeneratorRuntime.wrap(function getMainpageWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(_excursionApi.getMainpage);

        case 3:
          categories = _context.sent;
          _context.next = 6;
          return (0, _effects.put)(_actions.actions.getMainpageSuccess(categories));

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return (0, _effects.put)(_actions.actions.getMainpageFail(_context.t0));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}