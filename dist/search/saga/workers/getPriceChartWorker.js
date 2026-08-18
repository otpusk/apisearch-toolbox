"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPriceChartWorker = getPriceChartWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../../auth/selectors");
var _fn = require("../../../queries/fn");
var _selectors2 = require("../../../queries/selectors");
var _actions = require("../../actions");
const computedToParam = query => {
  const IS_SET_SINGLE_HOTEL = query.get(_fn.QUERY_PARAMS.HOTELS).size === 1;
  const IS_SET_SINGLE_CITY = query.get(_fn.QUERY_PARAMS.CITIES).size === 1;
  if (IS_SET_SINGLE_HOTEL) {
    return query.get(_fn.QUERY_PARAMS.HOTELS).first();
  }
  if (IS_SET_SINGLE_CITY) {
    return query.get(_fn.QUERY_PARAMS.CITIES).first();
  }
  return query.get(_fn.QUERY_PARAMS.COUNTRY);
};
function getPriceChartWorker(_ref) {
  let {
    payload: {
      queryId,
      duration,
      methodVersion
    }
  } = _ref;
  return function* () {
    const token = yield (0, _effects.select)(_selectors.getToken);
    const query = yield (0, _effects.select)(state => (0, _selectors2.getQuery)(state, {
      queryID: queryId
    }));
    try {
      const params = {
        to: computedToParam(query),
        from: query.get(_fn.QUERY_PARAMS.DEPARTURES).join(','),
        checkIn: query.get(_fn.QUERY_PARAMS.DATES).get('from').format('YYYY-MM-DD'),
        checkTo: query.get(_fn.QUERY_PARAMS.DATES).get('from').clone().add(duration || 30, 'days').format('YYYY-MM-DD'),
        people: `${query.get(_fn.QUERY_PARAMS.ADULTS)}${query.get(_fn.QUERY_PARAMS.CHILDREN).map(age => age < 10 ? `0${age}` : age).join('')}`,
        nights: query.get(_fn.QUERY_PARAMS.DURATION).get('from'),
        nightsTo: query.get(_fn.QUERY_PARAMS.DURATION).get('to'),
        currency: query.get(_fn.QUERY_PARAMS.CURRENCY)
      };
      const chart = yield (0, _effects.call)(_jsonApi.getToursGraph, token, params, methodVersion);
      yield (0, _effects.put)(_actions.searchActions.getPriceChartSuccess(queryId, chart));
    } catch (error) {
      console.error(error);
      yield (0, _effects.put)(_actions.searchActions.getPriceChartFail(error));
    }
  }();
}