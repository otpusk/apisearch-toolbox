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

var _marked = /*#__PURE__*/regeneratorRuntime.mark(runSearchWorker);

function runSearchWorker(_ref) {
  var _ref$payload, queryId, _ref$payload$options, _ref$payload$options$, withHash, query, formattedQuery, page, tours, hash;

  return regeneratorRuntime.wrap(function runSearchWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, queryId = _ref$payload.queryId, _ref$payload$options = _ref$payload.options;
          _ref$payload$options = _ref$payload$options === void 0 ? {} : _ref$payload$options;
          _ref$payload$options$ = _ref$payload$options.withHash, withHash = _ref$payload$options$ === void 0 ? true : _ref$payload$options$;
          _context.prev = 3;
          _context.next = 6;
          return (0, _effects.select)(function (_ref2) {
            var excursionSearch = _ref2.excursionSearch;
            return excursionSearch.getIn(['queries', queryId]);
          });

        case 6:
          query = _context.sent;
          formattedQuery = query.toMap().map(function (value) {
            return (0, _moment["default"])(value, 'YYYY-MM-DD', true).isValid() ? (0, _moment["default"])(value).format('YYYY-MM-DD') : value;
          }).map(function (value) {
            return Array.isArray(value) && value.length === 0 ? false : value;
          }).filter(function (value) {
            return Boolean(value);
          }).toJS();
          page = formattedQuery.page;
          _context.next = 11;
          return (0, _effects.call)(_excursionApi.getSearch, formattedQuery);

        case 11:
          tours = _context.sent;

          if (withHash) {
            hash = query.compileQuery();
            window.location.hash = hash;
          }

          _context.next = 15;
          return (0, _effects.put)(_actions.actions.processSearch(queryId, page, tours));

        case 15:
          _context.next = 17;
          return (0, _effects.put)(_actions.actions.finishSearch(queryId));

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](3);
          _context.next = 23;
          return (0, _effects.put)(_actions.actions.failSearch(queryId));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[3, 19]]);
}