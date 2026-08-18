"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQueryStringWorker = parseQueryStringWorker;
var _effects = require("redux-saga/effects");
var _immutable = require("immutable");
var _actions = require("../../actions");
var _actions2 = require("../../../search/actions");
var _fn = require("../../fn");
var _parsers = require("../../parsers");
// Core

// Instruments

function* parseQueryParam(paramName, rawValue, queryId) {
  const token = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'token']));
  const currentValue = yield (0, _effects.select)(state => state.queries.get(queryId).get(paramName, null));
  const paramsToParsers = {
    [_fn.QUERY_PARAMS.AUTOSTART]: Boolean,
    [_fn.QUERY_PARAMS.DEPARTURE]: Number,
    [_fn.QUERY_PARAMS.CATEGORY]: _parsers.binaryParser,
    [_fn.QUERY_PARAMS.TRANSPORT]: _parsers.binaryParser,
    [_fn.QUERY_PARAMS.FOOD]: _parsers.binaryParser,
    [_fn.QUERY_PARAMS.DATES]: _parsers.datesParser,
    [_fn.QUERY_PARAMS.DURATION]: _parsers.rangeParser,
    [_fn.QUERY_PARAMS.ADULTS]: Number,
    [_fn.QUERY_PARAMS.CHILDREN]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List),
    [_fn.QUERY_PARAMS.COUNTRY]: String,
    [_fn.QUERY_PARAMS.CITIES]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
    [_fn.QUERY_PARAMS.HOTELS]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
    [_fn.QUERY_PARAMS.PRICE]: _parsers.rangeParser,
    [_fn.QUERY_PARAMS.SERVICES]: (0, _parsers.createImmutableArrayParser)(_immutable.Set)
  };
  if (rawValue !== _fn.GLUE.empty) {
    const parsedValue = yield paramsToParsers[paramName](rawValue, {
      prevValue: currentValue,
      token
    });
    if (parsedValue) {
      yield (0, _effects.put)(_actions.queriesActions.changeQueryParam(queryId, paramName, parsedValue));
    }
  }
}
function parseQueryStringWorker(_ref) {
  let {
    payload: {
      queryString,
      queryId
    }
  } = _ref;
  return function* () {
    const baseQuery = yield (0, _effects.select)(state => state.queries.get(queryId));
    const queryParams = queryString.replace('#/', '').split('/');
    try {
      for (const [paramName] of baseQuery) {
        const position = baseQuery.keySeq().findIndex(f => f === paramName);
        const rawValue = position in queryParams ? queryParams[position] : null;
        if (rawValue) {
          yield parseQueryParam(paramName, rawValue, queryId);
        }
      }
      yield (0, _effects.put)(_actions.queriesActions.parseQueryStringSuccess(queryId));
    } catch (error) {
      yield (0, _effects.put)(_actions.queriesActions.parseQueryStringFail(error));
    }
    const resultQuery = yield (0, _effects.select)(state => state.queries.get(queryId));
    if (resultQuery.get(_fn.QUERY_PARAMS.AUTOSTART) === true) {
      yield (0, _effects.put)(_actions2.searchActions.runSearch(queryId));
    }
  }();
}