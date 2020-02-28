"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitSearchWorker = submitSearchWorker;

var _effects = require("redux-saga/effects");

var _fn = require("../../../queries/fn");

var _actions = require("../../../search/actions");

var _actions2 = require("../../../queries/actions");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(submitSearchWorker);

function submitSearchWorker(_ref) {
  var _ref$payload, queryId, _ref$payload$targetPa, targetPage, _ref2, query, location, searchCountryId;

  return regeneratorRuntime.wrap(function submitSearchWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, queryId = _ref$payload.queryId, _ref$payload$targetPa = _ref$payload.targetPage, targetPage = _ref$payload$targetPa === void 0 ? null : _ref$payload$targetPa;
          _context.next = 3;
          return (0, _effects.select)(function (state) {
            return {
              query: state.queries.get(queryId),
              location: state.router.location
            };
          });

        case 3:
          _ref2 = _context.sent;
          query = _ref2.query;
          location = _ref2.location;
          searchCountryId = query.get(_fn.QUERY_PARAMS.COUNTRY);

          if (!searchCountryId) {
            _context.next = 14;
            break;
          }

          _context.next = 10;
          return (0, _effects.put)(_actions2.queriesActions.changeQueryParam(queryId, _fn.QUERY_PARAMS.AUTOSTART, true));

        case 10:
          _context.next = 12;
          return (0, _effects.put)(_actions2.queriesActions.compileQueryString(queryId));

        case 12:
          _context.next = 14;
          return (0, _effects.put)(_actions.searchActions.runSearch(queryId));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}