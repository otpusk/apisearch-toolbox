"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchCountWorker = getSearchCountWorker;

var _effects = require("redux-saga/effects");

var _moment = _interopRequireDefault(require("moment"));

var _actions = require("../../actions");

var _excursionApi = require("@otpusk/excursion-api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getSearchCountWorker);

function getSearchCountWorker(_ref) {
  var queryId, query, formattedQuery, excursionsCount;
  return regeneratorRuntime.wrap(function getSearchCountWorker$(_context) {
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
          return (0, _effects.call)(_excursionApi.getSearchCount, formattedQuery);

        case 8:
          excursionsCount = _context.sent;
          _context.next = 11;
          return (0, _effects.put)(_actions.actions.getExcursionsCountSuccess(queryId, excursionsCount));

        case 11:
          _context.next = 18;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          _context.next = 18;
          return (0, _effects.put)(_actions.actions.getExcursionsCountFail(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 13]]);
}