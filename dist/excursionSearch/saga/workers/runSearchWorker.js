"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runSearchWorker = runSearchWorker;

var _effects = require("redux-saga/effects");

var _moment = _interopRequireDefault(require("moment"));

var _actions = require("../../actions");

var _excursionApi = require("@otpusk/excursion-api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(runSearchWorker);

function runSearchWorker(_ref) {
  var queryId, query, formattedQuery, tours;
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
          formattedQuery = query.toMap().map(function (value) {
            return _moment["default"].isMoment(value) ? value.format('YYYY-MM-DD') : value;
          }).map(function (value) {
            return Array.isArray(value) && value.length === 0 ? false : value;
          }).filter(function (value) {
            return Boolean(value);
          }).toJS();
          _context.next = 8;
          return (0, _effects.call)(_excursionApi.getSearch, formattedQuery);

        case 8:
          tours = _context.sent;
          _context.next = 11;
          return (0, _effects.put)(_actions.actions.processSearch(queryId, tours));

        case 11:
          _context.next = 13;
          return (0, _effects.put)(_actions.actions.finishSearch(queryId));

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          _context.next = 19;
          return (0, _effects.put)(_actions.actions.failSearch(queryId));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 15]]);
}