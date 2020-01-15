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
  var query, tourId, _ref2, offices, regions;

  return regeneratorRuntime.wrap(function getAgenciesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = _ref.payload;
          tourId = query.params.cruiseId;
          _context.prev = 2;
          _context.next = 5;
          return (0, _effects.call)(_excursionApi.getAgencies, query);

        case 5:
          _ref2 = _context.sent;
          offices = _ref2.offices;
          regions = _ref2.regions;
          _context.next = 10;
          return (0, _effects.put)(_actions.actions.getRegionsSuccess(regions));

        case 10:
          _context.next = 12;
          return (0, _effects.put)(_actions.actions.getOfficesSuccess(tourId, offices));

        case 12:
          _context.next = 20;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          _context.next = 18;
          return (0, _effects.put)(_actions.actions.getRegionsFail(_context.t0));

        case 18:
          _context.next = 20;
          return (0, _effects.put)(_actions.actions.getOfficesFail(tourId));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[2, 14]]);
}