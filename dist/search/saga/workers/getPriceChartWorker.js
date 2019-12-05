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
  var IS_SET_SINGLE_HOTEL = query.get(_fn.QUERY_PARAMS.HOTELS, (0, _immutable.Set)()).size === 1;
  var IS_SET_SINGLE_CITY = query.get(_fn.QUERY_PARAMS.CITIES, (0, _immutable.Set)()).size === 1;

  if (IS_SET_SINGLE_HOTEL) {
    return query.get(_fn.QUERY_PARAMS.HOTELS).first();
  }

  if (IS_SET_SINGLE_CITY) {
    return query.get(_fn.QUERY_PARAMS.CITIES).first();
  }

  return query.get(_fn.QUERY_PARAMS.COUNTRY);
};

function getPriceChartWorker(_ref) {
  var payload, queryId, duration, _ref2, query, token, params, chart;

  return regeneratorRuntime.wrap(function getPriceChartWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          queryId = payload.queryId, duration = payload.duration;
          _context.prev = 2;
          _context.next = 5;
          return (0, _effects.select)(function (_ref3) {
            var queries = _ref3.queries,
                auth = _ref3.auth;
            return {
              query: queries.get(queryId),
              token: auth.getIn(['otpusk', 'token'])
            };
          });

        case 5:
          _ref2 = _context.sent;
          query = _ref2.query;
          token = _ref2.token;
          params = {
            to: computedToParam(query),
            from: query.get(_fn.QUERY_PARAMS.DEPARTURE),
            checkIn: query.get(_fn.QUERY_PARAMS.DATES).get('from').format('YYYY-MM-DD'),
            checkTo: query.get(_fn.QUERY_PARAMS.DATES).get('from').clone().add(duration || 30, 'days').format('YYYY-MM-DD'),
            people: "".concat(query.get(_fn.QUERY_PARAMS.ADULTS)).concat(query.get(_fn.QUERY_PARAMS.CHILDREN).map(function (age) {
              return age < 10 ? "0".concat(age) : age;
            }).join('')),
            nights: (0, _immutable.Range)(query.get(_fn.QUERY_PARAMS.DURATION).get('from') - 1, query.get(_fn.QUERY_PARAMS.DURATION).get('to')).toList().join(',')
          };
          _context.next = 11;
          return (0, _effects.call)(_jsonApi.getToursGraph, token, params);

        case 11:
          chart = _context.sent;
          _context.next = 14;
          return (0, _effects.put)(_actions.searchActions.getPriceChartSuccess(queryId, chart));

        case 14:
          _context.next = 21;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);
          _context.next = 21;
          return (0, _effects.put)(_actions.searchActions.getPriceChartFail(_context.t0));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[2, 16]]);
}