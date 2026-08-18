"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _actions = require("./actions");
// Core

// Instruments

const initialState = (0, _immutable.Map)();
const reducer = exports.reducer = (0, _reduxActions.handleActions)({
  [_actions.actions.getMainpageSuccess]: (state, _ref) => {
    let {
      payload: categories
    } = _ref;
    return state.set('mainpage', categories);
  },
  [_actions.actions.getMainpageFail]: state => {
    return state.set('mainpage', []);
  },
  [_actions.actions.getCountriesSuccess]: (state, _ref2) => {
    let {
      payload: countries
    } = _ref2;
    return state.set('countries', countries);
  },
  [_actions.actions.getCountriesFail]: state => {
    return state.set('countries', []);
  }
}, initialState);