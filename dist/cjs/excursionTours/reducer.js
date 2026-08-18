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

const initialState = (0, _immutable.Map)({
  store: {}
});
const reducer = exports.reducer = (0, _reduxActions.handleActions)({
  [_actions.actions.getTourSuccess]: (state, _ref) => {
    let {
      payload: {
        tourId,
        tour
      }
    } = _ref;
    return state.setIn(['store', tourId], tour);
  }
}, initialState);