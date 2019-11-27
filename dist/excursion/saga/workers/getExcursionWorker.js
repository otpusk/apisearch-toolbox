"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExcursionWorker = getExcursionWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _excursionApi = require("@otpusk/excursion-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getExcursionWorker);

function getExcursionWorker(_ref) {
  var excursion, excursionData;
  return regeneratorRuntime.wrap(function getExcursionWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          excursion = _ref.payload.excursion;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_excursionApi.getExcursion, excursion);

        case 4:
          excursionData = _context.sent;
          _context.next = 7;
          return (0, _effects.put)(_actions.actions.getExcursionSuccess(excursion, excursionData));

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return (0, _effects.put)(_actions.actions.getExcursionFail(_context.t0));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 9]]);
}