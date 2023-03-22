"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queriesReducer = void 0;

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

var _reduxActions = require("redux-actions");

var R = _interopRequireWildcard(require("ramda"));

var _actions = require("./actions");

var _fn = require("./fn");

var _handleActions;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initalState = (0, _immutable.Map)({});
var queriesReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.queriesActions.createQuery, function (state, _ref) {
  var _ref$payload = _ref.payload,
      queryId = _ref$payload.queryId,
      initialParams = _ref$payload.initialParams,
      isUrl = _ref$payload.isUrl;
  return state.set(queryId, isUrl ? (0, _fn.createSearchQuery)(initialParams) : (0, _fn.createQuery)(initialParams));
}), _defineProperty(_handleActions, _actions.queriesActions.setQuery, function (state, _ref2) {
  var _ref2$payload = _ref2.payload,
      queryId = _ref2$payload.queryId,
      query = _ref2$payload.query;
  return state.set(queryId, query);
}), _defineProperty(_handleActions, _actions.queriesActions.removeQuery, function (state, _ref3) {
  var queryId = _ref3.payload;
  return state.remove(queryId);
}), _defineProperty(_handleActions, _actions.queriesActions.createQueryFromOffer, function (state, _ref4) {
  var _objectSpread2;

  var _ref4$payload = _ref4.payload,
      queryId = _ref4$payload.queryId,
      hotel = _ref4$payload.hotel,
      offer = _ref4$payload.offer,
      _ref4$payload$overrid = _ref4$payload.overrides,
      overrides = _ref4$payload$overrid === void 0 ? {} : _ref4$payload$overrid;
  var defaultQuery = (0, _fn.createQuery)();
  return state.set(queryId, (0, _fn.createQuery)(_objectSpread((_objectSpread2 = {}, _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.COUNTRY, hotel.country.id), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.DEPARTURES, defaultQuery.get(_fn.QUERY_PARAMS.DEPARTURES).push("".concat(offer.departure))), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.DURATION, (0, _immutable.Map)({
    from: offer.nights,
    to: offer.nights
  })), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.DATES, (0, _immutable.Map)({
    from: (0, _moment["default"])(offer.date),
    to: (0, _moment["default"])(offer.date)
  })), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.CATEGORY, defaultQuery.get(_fn.QUERY_PARAMS.CATEGORY).map(function () {
    return false;
  }).merge(_defineProperty({}, hotel.stars, true))), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.ADULTS, offer.adults), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.CHILDREN, (0, _immutable.Range)(0, offer.children).map(function () {
    return offer.childrenAge.replace(/^.*\D(\d+)\D*$/, '$1');
  }).map(Number).toList()), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.CITIES, (0, _immutable.Set)([hotel.city.id])), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.HOTELS, (0, _immutable.Set)([hotel.id])), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.TRANSPORTS, defaultQuery.get(_fn.QUERY_PARAMS.TRANSPORTS).update(0, function (transportsMap) {
    return transportsMap.map(R.F).merge(_defineProperty({}, offer.transport, true));
  })), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.FOOD, defaultQuery.get(_fn.QUERY_PARAMS.FOOD).map(function () {
    return false;
  }).merge(_defineProperty({}, offer.food, true))), _defineProperty(_objectSpread2, _fn.QUERY_PARAMS.CURRENCY, offer.currency), _objectSpread2), overrides)));
}), _defineProperty(_handleActions, _actions.queriesActions.changeQueryParam, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
      queryId = _ref5$payload.queryId,
      paramName = _ref5$payload.paramName,
      paramValue = _ref5$payload.paramValue;
  return state.setIn([queryId, paramName], paramValue);
}), _defineProperty(_handleActions, _actions.queriesActions.changeQueryParams, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
      queryId = _ref6$payload.queryId,
      paramValues = _ref6$payload.paramValues;
  return state.mergeIn([queryId], paramValues);
}), _defineProperty(_handleActions, _actions.queriesActions.resetQueryParam, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
      queryId = _ref7$payload.queryId,
      paramName = _ref7$payload.paramName;
  return state.setIn([queryId, paramName], (0, _fn.createQuery)().get(paramName));
}), _defineProperty(_handleActions, _actions.queriesActions.parseOsQueryString, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
      targetQueryId = _ref8$payload.targetQueryId,
      queryString = _ref8$payload.queryString;
  return state.update(function (queries) {
    return queryString ? queries.set(targetQueryId, (0, _fn.parseOSQueryHash)(queryString, queries.get(targetQueryId))) : queries;
  });
}), _defineProperty(_handleActions, _actions.queriesActions.parseQueryString, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
      queryId = _ref9$payload.queryId,
      queryString = _ref9$payload.queryString;
  return state.update(function (queries) {
    return queryString ? queries.set(queryId, (0, _fn.parseQueryString)(queryString, queries.get(queryId))) : queries;
  });
}), _handleActions), initalState);
exports.queriesReducer = queriesReducer;