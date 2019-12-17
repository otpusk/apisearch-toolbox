"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAgenciesWorker = getAgenciesWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _excursionApi = require("@otpusk/excursion-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getAgenciesWorker);

function getAgenciesWorker(_ref) {
  var _ref$payload, tourId, query, agencies;

  return regeneratorRuntime.wrap(function getAgenciesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, tourId = _ref$payload.tourId, query = _ref$payload.query;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_excursionApi.getAgencies, query);

        case 4:
          agencies = _context.sent;
          _context.next = 7;
          return (0, _effects.put)(_actions.actions.getAgenciesSuccess(tourId, agencies));

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return (0, _effects.put)(_actions.actions.getAgenciesFail(_context.t0));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 9]]);
}