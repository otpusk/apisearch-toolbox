"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepartureCitiesWorker = getDepartureCitiesWorker;

var _effects = require("redux-saga/effects");

var _excursionApi = require("@otpusk/excursion-api");

var _actions = require("../../actions");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getDepartureCitiesWorker);

function getDepartureCitiesWorker(_ref) {
  var countryId, cities;
  return regeneratorRuntime.wrap(function getDepartureCitiesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          countryId = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_excursionApi.getFilterDeparture, countryId);

        case 4:
          cities = _context.sent;
          _context.next = 7;
          return (0, _effects.put)(_actions.actions.getDepartureCitiesSuccess(countryId, cities));

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return (0, _effects.put)(_actions.actions.getDepartureCitiesFail(_context.t0));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 9]]);
}