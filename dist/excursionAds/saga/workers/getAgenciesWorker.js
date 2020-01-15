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
  var query, _ref2, offices, regions, tourId;

  return regeneratorRuntime.wrap(function getAgenciesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_excursionApi.getAgencies, query);

        case 4:
          _ref2 = _context.sent;
          offices = _ref2.offices;
          regions = _ref2.regions;
          tourId = query.params.cruiseId;
          _context.next = 10;
          return (0, _effects.put)(_actions.actions.getRegionsSuccess(regions ? regions : 'none'));

        case 10:
          _context.next = 12;
          return (0, _effects.put)(_actions.actions.getOfficesSuccess(tourId, offices ? offices : 'none'));

        case 12:
          _context.next = 20;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          _context.next = 18;
          return (0, _effects.put)(_actions.actions.getRegionsFail(_context.t0));

        case 18:
          _context.next = 20;
          return (0, _effects.put)(_actions.actions.getOfficesFail(_context.t0));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 14]]);
}