"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRegionsWorker = getRegionsWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _excursionApi = require("@otpusk/excursion-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getRegionsWorker);

function getRegionsWorker(_ref) {
  var query, _ref2, regions, tourId;

  return regeneratorRuntime.wrap(function getRegionsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_excursionApi.getAgencies, query);

        case 4:
          _ref2 = _context.sent;
          regions = _ref2.regions;
          tourId = query.params.cruiseId;
          _context.next = 9;
          return (0, _effects.put)(_actions.actions.getRegionsSuccess(tourId, regions));

        case 9:
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          _context.next = 15;
          return (0, _effects.put)(_actions.actions.getRegionsFail(_context.t0));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 11]]);
}