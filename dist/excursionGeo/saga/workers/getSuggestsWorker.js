"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestsWorker = getSuggestsWorker;

var _effects = require("redux-saga/effects");

var _excursionApi = require("@otpusk/excursion-api");

var _actions = require("../../actions");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getSuggestsWorker);

function getSuggestsWorker(_ref) {
  var text, suggestions;
  return regeneratorRuntime.wrap(function getSuggestsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          text = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_excursionApi.getSuggest, text);

        case 4:
          suggestions = _context.sent;
          _context.next = 7;
          return (0, _effects.put)(_actions.actions.getSuggestsSuccess(text, suggestions));

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return (0, _effects.put)(_actions.actions.getSuggestsFail(_context.t0));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 9]]);
}