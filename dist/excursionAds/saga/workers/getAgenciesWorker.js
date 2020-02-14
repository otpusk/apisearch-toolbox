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
  var query, tourId, formdata, _ref2, offices, regions;

  return regeneratorRuntime.wrap(function getAgenciesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = _ref.payload;
          tourId = query.cruiseId;
          console.log({
            query: query
          });
          _context.prev = 3;
          formdata = new FormData();
          formdata.append('s', query);
          console.log({
            formdata: formdata
          });
          _context.next = 9;
          return (0, _effects.call)(_excursionApi.getAgencies, formdata);

        case 9:
          _ref2 = _context.sent;
          offices = _ref2.offices;
          regions = _ref2.regions;
          _context.next = 14;
          return (0, _effects.put)(_actions.actions.getRegionsSuccess(regions));

        case 14:
          _context.next = 16;
          return (0, _effects.put)(_actions.actions.getOfficesSuccess(tourId, offices));

        case 16:
          _context.next = 25;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](3);
          console.log({
            error: _context.t0
          });
          _context.next = 23;
          return (0, _effects.put)(_actions.actions.getRegionsFail(_context.t0));

        case 23:
          _context.next = 25;
          return (0, _effects.put)(_actions.actions.getOfficesFail(tourId));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[3, 18]]);
}