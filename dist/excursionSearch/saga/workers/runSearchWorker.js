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
  var _ref$payload, queryId, _ref$payload$options, _ref$payload$options$, withHash, _ref$payload$options$2, showMore, query, formattedQuery, page, tours, hash;

  return regeneratorRuntime.wrap(function runSearchWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, queryId = _ref$payload.queryId, _ref$payload$options = _ref$payload.options, _ref$payload$options$ = _ref$payload$options.withHash, withHash = _ref$payload$options$ === void 0 ? true : _ref$payload$options$, _ref$payload$options$2 = _ref$payload$options.showMore, showMore = _ref$payload$options$2 === void 0 ? false : _ref$payload$options$2;
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
          page = formattedQuery.page;
          _context.next = 9;
          return (0, _effects.call)(_excursionApi.getSearch, formattedQuery);

        case 9:
          tours = _context.sent;

          if (withHash) {
            hash = query.compileQuery();
            window.location.hash = hash;
          }

          if (showMore) {
            // disable scroll to top for runNextPageSearch
            window.location.state.from = 'showMore';
          }

          _context.next = 14;
          return (0, _effects.put)(_actions.actions.processSearch(queryId, page, tours));

        case 14:
          _context.next = 16;
          return (0, _effects.put)(_actions.actions.finishSearch(queryId));

        case 16:
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          _context.next = 22;
          return (0, _effects.put)(_actions.actions.failSearch(queryId));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 18]]);
}