"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runSearchWorker = runSearchWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _excursionApi = require("@otpusk/excursion-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(runSearchWorker);

function runSearchWorker(_ref) {
  var queryId, query, tours;
  return regeneratorRuntime.wrap(function runSearchWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          queryId = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (_ref2) {
            var excursionSearch = _ref2.excursionSearch;
            return excursionSearch.getIn(['queries', queryId]);
          });

        case 4:
          query = _context.sent;
          _context.next = 7;
          return (0, _effects.call)(_excursionApi.getSearch, queryId, query.toJS());

        case 7:
          tours = _context.sent;
          _context.next = 10;
          return (0, _effects.put)(_actions.actions.processSearch(queryId, tours));

        case 10:
          _context.next = 12;
          return (0, _effects.put)(_actions.actions.finishSearch(queryId));

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          _context.next = 18;
          return (0, _effects.put)(_actions.actions.failSearch(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 14]]);
}