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
  var query, _ref2, regions;

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
          _context.next = 8;
          return (0, _effects.put)(_actions.actions.getRegionsSuccess(regions));

        case 8:
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          _context.next = 14;
          return (0, _effects.put)(_actions.actions.getRegionsFail(_context.t0));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 10]]);
}