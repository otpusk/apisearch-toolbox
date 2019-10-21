"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPriceChartWorker = getPriceChartWorker;

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _jsonApi = require("@otpusk/json-api");

var _actions = require("../../actions");

var _fn = require("../../../queries/fn");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getPriceChartWorker);

var computedToParam = function computedToParam(query) {
  switch (true) {
    case query.get(_fn.QUERY_PARAMS.HOTELS, (0, _immutable.Set)()).size === 1:
      return query.get(_fn.QUERY_PARAMS.HOTELS);

    case query.get(_fn.QUERY_PARAMS.CITIES, (0, _immutable.Set)()).size === 1:
      return query.get(_fn.QUERY_PARAMS.CITIES);

    default:
      return query.get(_fn.QUERY_PARAMS.COUNTRY);
  }
};

function getPriceChartWorker(_ref) {
  var queryId, _ref2, query, token, params, chart;

  return regeneratorRuntime.wrap(function getPriceChartWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          queryId = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (_ref3) {
            var queries = _ref3.queries,
                auth = _ref3.auth;
            return {
              query: queries.get(queryId),
              token: auth.getIn(['otpusk', 'token'])
            };
          });

        case 4:
          _ref2 = _context.sent;
          query = _ref2.query;
          token = _ref2.token;
          params = {
            to: computedToParam(query),
            from: query.get(_fn.QUERY_PARAMS.DEPARTURE),
            checkIn: query.get(_fn.QUERY_PARAMS.DATES).get('from').format('YYYY-MM-DD'),
            checkTo: query.get(_fn.QUERY_PARAMS.DATES).get('from').clone().add(30, 'days').format('YYYY-MM-DD'),
            people: "".concat(query.get(_fn.QUERY_PARAMS.ADULTS)).concat(query.get(_fn.QUERY_PARAMS.CHILDREN).map(function (age) {
              return age < 10 ? "0".concat(age) : age;
            }).join('')),
            nights: (0, _immutable.Range)(query.get(_fn.QUERY_PARAMS.DURATION).get('from'), query.get(_fn.QUERY_PARAMS.DURATION).get('to') + 1).toList().join(',')
          };
          _context.next = 10;
          return (0, _effects.call)(_jsonApi.getToursGraph, token, params);

        case 10:
          chart = _context.sent;
          _context.next = 13;
          return (0, _effects.put)(_actions.searchActions.getPriceChartSuccess(queryId, chart));

        case 13:
          _context.next = 20;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          _context.next = 20;
          return (0, _effects.put)(_actions.searchActions.getPriceChartFail(_context.t0));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 15]]);
}