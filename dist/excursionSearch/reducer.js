"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;
var _reduxActions = require("redux-actions");
var _immutable = require("immutable");
var _actions = require("./actions");
// Core

// Instruments

const initialState = (0, _immutable.Map)({
  statuses: {},
  queries: {},
  results: {},
  operators: {}
});
const reducer = exports.reducer = (0, _reduxActions.handleActions)({
  [(0, _reduxActions.combineActions)(_actions.actions.createQuery, _actions.actions.setQuery)]: (state, _ref) => {
    let {
      payload: {
        queryId,
        query
      }
    } = _ref;
    return state.setIn(['queries', queryId], query);
  },
  [_actions.actions.runSearch]: (state, _ref2) => {
    let {
      payload: {
        queryId
      }
    } = _ref2;
    return state.removeIn(['results', queryId]).setIn(['statuses', queryId], 'process');
  },
  [_actions.actions.runNextPageSearch]: (state, _ref3) => {
    let {
      payload: {
        queryId
      }
    } = _ref3;
    return state.setIn(['statuses', queryId], 'process');
  },
  [_actions.actions.processSearch]: (state, _ref4) => {
    let {
      payload: {
        queryId,
        page,
        tours
      }
    } = _ref4;
    return state.setIn(['results', queryId, page], tours);
  },
  [_actions.actions.finishSearch]: (state, _ref5) => {
    let {
      payload: queryId
    } = _ref5;
    return state.setIn(['statuses', queryId], 'success');
  },
  [_actions.actions.failSearch]: (state, _ref6) => {
    let {
      payload: queryId
    } = _ref6;
    return state.setIn(['statuses', queryId], 'failed');
  },
  [_actions.actions.getSearchCategoriesSuccess]: (state, _ref7) => {
    let {
      payload: {
        key,
        categories
      }
    } = _ref7;
    return state.setIn(['categories', key], categories);
  },
  [_actions.actions.getSearchOperatorsSuccess]: (state, _ref8) => {
    let {
      payload: {
        key,
        operators
      }
    } = _ref8;
    return state.setIn(['operators', key], operators);
  },
  [_actions.actions.getSearchTransportsSuccess]: (state, _ref9) => {
    let {
      payload: {
        key,
        transports
      }
    } = _ref9;
    return state.setIn(['transports', key], transports);
  },
  [_actions.actions.getSearchPricesSuccess]: (state, _ref10) => {
    let {
      payload: {
        key,
        prices
      }
    } = _ref10;
    return state.setIn(['prices', key], prices);
  }
}, initialState);