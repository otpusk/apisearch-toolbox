"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operatorsReducer = void 0;
var _reduxActions = require("redux-actions");
var _immutable = require("immutable");
var _actions = require("./actions");
// actions

const initialState = (0, _immutable.Map)({
  'rates': {},
  'store': (0, _immutable.Map)(),
  'ui': (0, _immutable.Map)()
});
const operatorsReducer = exports.operatorsReducer = (0, _reduxActions.handleActions)({
  [_actions.operatorsActions.getOperatorsSuccess]: (state, _ref) => {
    let {
      payload
    } = _ref;
    const {
      countryId,
      operators
    } = payload;
    return state.setIn(['store', countryId], operators);
  },
  [_actions.operatorsActions.setUiFlag]: (state, _ref2) => {
    let {
      payload
    } = _ref2;
    const {
      path,
      value
    } = payload;
    return state.setIn(['ui', ...path], value);
  },
  [_actions.operatorsActions.getCurrencyRatesSuccess]: (state, _ref3) => {
    let {
      payload
    } = _ref3;
    const {
      key,
      rates
    } = payload;
    return state.setIn(['rates', key], rates);
  }
}, initialState);