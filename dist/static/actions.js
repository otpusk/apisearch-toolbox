"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStaticData = exports.clearStaticData = void 0;

var _reduxActions = require("redux-actions");

var _createActions = (0, _reduxActions.createActions)({
  clearStaticData: function clearStaticData() {
    return void 0;
  },
  getStaticData: function getStaticData() {
    return void 0;
  }
}, {
  prefix: 'API_SEARCH_STATIC'
}),
    clearStaticData = _createActions.clearStaticData,
    getStaticData = _createActions.getStaticData;

exports.getStaticData = getStaticData;
exports.clearStaticData = clearStaticData;