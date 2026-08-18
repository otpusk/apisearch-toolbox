"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileQueryStringWorker = compileQueryStringWorker;
var _effects = require("redux-saga/effects");
var _fn = require("../../fn");
// Core

// Instrumetns

function compileQueryStringWorker(_ref) {
  let {
    payload: {
      queryId
    }
  } = _ref;
  return function* () {
    const query = yield (0, _effects.select)(state => state.queries.get(queryId));
    window.location.hash = (0, _fn.compileQuery)(query);
  }();
}