"use strict";

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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var initalState = (0, _immutable.Map)({});
var queriesReducer = exports.queriesReducer = (0, _reduxActions.handleActions)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _actions.queriesActions.createQuery, function (state, _ref) {
  var _ref$payload = _ref.payload,
    queryId = _ref$payload.queryId,
    initialParams = _ref$payload.initialParams,
    isUrl = _ref$payload.isUrl;
  return state.set(queryId, isUrl ? (0, _fn.createSearchQuery)(initialParams) : (0, _fn.createQuery)(initialParams));
}), _actions.queriesActions.setQuery, function (state, _ref2) {
  var _ref2$payload = _ref2.payload,
    queryId = _ref2$payload.queryId,
    query = _ref2$payload.query;
  return state.set(queryId, query);
}), _actions.queriesActions.removeQuery, function (state, _ref3) {
  var queryId = _ref3.payload;
  return state.remove(queryId);
}), _actions.queriesActions.createQueryFromOffer, function (state, _ref4) {
  var _objectSpread2;
  var _ref4$payload = _ref4.payload,
    queryId = _ref4$payload.queryId,
    hotel = _ref4$payload.hotel,
    offer = _ref4$payload.offer,
    _ref4$payload$overrid = _ref4$payload.overrides,
    overrides = _ref4$payload$overrid === void 0 ? {} : _ref4$payload$overrid;
  var defaultQuery = (0, _fn.createQuery)();
  return state.set(queryId, (0, _fn.createQuery)(_objectSpread((_objectSpread2 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_objectSpread2, _fn.QUERY_PARAMS.COUNTRY, hotel.country.id), _fn.QUERY_PARAMS.DEPARTURES, defaultQuery.get(_fn.QUERY_PARAMS.DEPARTURES).push(offer.departure)), _fn.QUERY_PARAMS.DURATION, (0, _immutable.Map)({
    from: offer.nights,
    to: offer.nights
  })), _fn.QUERY_PARAMS.DATES, (0, _immutable.Map)({
    from: (0, _moment["default"])(offer.date),
    to: (0, _moment["default"])(offer.date)
  })), _fn.QUERY_PARAMS.CATEGORY, defaultQuery.get(_fn.QUERY_PARAMS.CATEGORY).map(function () {
    return false;
  }).merge(_defineProperty({}, hotel.stars, true))), _fn.QUERY_PARAMS.ADULTS, offer.adults), _fn.QUERY_PARAMS.CHILDREN, (0, _immutable.List)(offer.people.children)), _fn.QUERY_PARAMS.CITIES, (0, _immutable.Set)([hotel.city.id])), _fn.QUERY_PARAMS.HOTELS, (0, _immutable.Set)([hotel.id])), _fn.QUERY_PARAMS.TRANSPORTS, defaultQuery.get(_fn.QUERY_PARAMS.TRANSPORTS).update(0, function (transportsMap) {
    return transportsMap.map(R.F).merge(_defineProperty({}, offer.transport, true));
  })), _defineProperty(_defineProperty(_objectSpread2, _fn.QUERY_PARAMS.FOOD, defaultQuery.get(_fn.QUERY_PARAMS.FOOD).map(function () {
    return false;
  }).merge(_defineProperty({}, offer.food, true))), _fn.QUERY_PARAMS.CURRENCY, offer.currency)), overrides)));
}), _actions.queriesActions.changeQueryParam, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
    queryId = _ref5$payload.queryId,
    paramName = _ref5$payload.paramName,
    paramValue = _ref5$payload.paramValue;
  return state.setIn([queryId, paramName], paramValue);
}), _actions.queriesActions.changeQueryParams, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
    queryId = _ref6$payload.queryId,
    paramValues = _ref6$payload.paramValues;
  return state.mergeIn([queryId], paramValues);
}), _actions.queriesActions.resetQueryParam, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
    queryId = _ref7$payload.queryId,
    paramName = _ref7$payload.paramName;
  return state.setIn([queryId, paramName], (0, _fn.createQuery)().get(paramName));
}), _actions.queriesActions.parseOsQueryString, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
    targetQueryId = _ref8$payload.targetQueryId,
    queryString = _ref8$payload.queryString;
  return state.update(function (queries) {
    return queryString ? queries.set(targetQueryId, (0, _fn.parseOSQueryHash)(queryString, queries.get(targetQueryId))) : queries;
  });
}), _actions.queriesActions.parseQueryString, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
    queryId = _ref9$payload.queryId,
    queryString = _ref9$payload.queryString;
  return state.update(function (queries) {
    return queryString ? queries.set(queryId, (0, _fn.parseQueryString)(queryString, queries.get(queryId))) : queries;
  });
}), initalState);