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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const initalState = (0, _immutable.Map)({});
const queriesReducer = exports.queriesReducer = (0, _reduxActions.handleActions)({
  [_actions.queriesActions.createQuery]: (state, _ref) => {
    let {
      payload: {
        queryId,
        initialParams
      }
    } = _ref;
    return state.set(queryId, (0, _fn.createQuery)(initialParams));
  },
  [_actions.queriesActions.setQuery]: (state, _ref2) => {
    let {
      payload: {
        queryId,
        query
      }
    } = _ref2;
    return state.set(queryId, query);
  },
  [_actions.queriesActions.removeQuery]: (state, _ref3) => {
    let {
      payload: queryId
    } = _ref3;
    return state.remove(queryId);
  },
  [_actions.queriesActions.createQueryFromOffer]: (state, _ref4) => {
    let {
      payload: {
        queryId,
        hotel,
        offer,
        overrides = {}
      }
    } = _ref4;
    const defaultQuery = (0, _fn.createQuery)();
    return state.set(queryId, (0, _fn.createQuery)({
      [_fn.QUERY_PARAMS.COUNTRY]: hotel.country.id,
      [_fn.QUERY_PARAMS.DEPARTURES]: defaultQuery.get(_fn.QUERY_PARAMS.DEPARTURES).push(offer.departure),
      [_fn.QUERY_PARAMS.DURATION]: (0, _immutable.Map)({
        from: offer.nights,
        to: offer.nights
      }),
      [_fn.QUERY_PARAMS.DATES]: (0, _immutable.Map)({
        from: (0, _moment.default)(offer.date),
        to: (0, _moment.default)(offer.date)
      }),
      [_fn.QUERY_PARAMS.CATEGORY]: defaultQuery.get(_fn.QUERY_PARAMS.CATEGORY).map(() => false).merge({
        [hotel.stars]: true
      }),
      [_fn.QUERY_PARAMS.ADULTS]: offer.adults,
      [_fn.QUERY_PARAMS.CHILDREN]: (0, _immutable.List)(offer.people.children),
      [_fn.QUERY_PARAMS.CITIES]: (0, _immutable.Set)([hotel.city.id]),
      [_fn.QUERY_PARAMS.HOTELS]: (0, _immutable.Set)([hotel.id]),
      [_fn.QUERY_PARAMS.TRANSPORTS]: defaultQuery.get(_fn.QUERY_PARAMS.TRANSPORTS).update(0, transportsMap => transportsMap.map(R.F).merge({
        [offer.transport]: true
      })),
      [_fn.QUERY_PARAMS.FOOD]: defaultQuery.get(_fn.QUERY_PARAMS.FOOD).map(() => false).merge({
        [offer.food]: true
      }),
      [_fn.QUERY_PARAMS.CURRENCY]: offer.currency,
      ...overrides
    }));
  },
  [_actions.queriesActions.changeQueryParam]: (state, _ref5) => {
    let {
      payload: {
        queryId,
        paramName,
        paramValue
      }
    } = _ref5;
    return state.setIn([queryId, paramName], paramValue);
  },
  [_actions.queriesActions.changeQueryParams]: (state, _ref6) => {
    let {
      payload: {
        queryId,
        paramValues
      }
    } = _ref6;
    return state.mergeIn([queryId], paramValues);
  },
  [_actions.queriesActions.resetQueryParam]: (state, _ref7) => {
    let {
      payload: {
        queryId,
        paramName
      }
    } = _ref7;
    return state.setIn([queryId, paramName], (0, _fn.createQuery)().get(paramName));
  },
  [_actions.queriesActions.parseOsQueryString]: (state, _ref8) => {
    let {
      payload: {
        targetQueryId,
        queryString
      }
    } = _ref8;
    return state.update(queries => queryString ? queries.set(targetQueryId, (0, _fn.parseHashToQuery)(queryString)) : queries);
  },
  [_actions.queriesActions.parseQueryString]: (state, _ref9) => {
    let {
      payload: {
        queryId,
        queryString
      }
    } = _ref9;
    return state.update(queries => queryString ? queries.set(queryId, (0, _fn.parseQueryString)(queryString, queries.get(queryId))) : queries);
  }
}, initalState);