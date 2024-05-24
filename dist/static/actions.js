"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStaticData = exports.getStaticData = exports.clearStaticData = void 0;
var _reduxActions = require("redux-actions");
var _createActions = (0, _reduxActions.createActions)({
    clearStaticData: function clearStaticData() {
      return void 0;
    },
    getStaticData: function getStaticData() {
      return void 0;
    },
    setStaticData: function setStaticData(data) {
      return data;
    }
  }, {
    prefix: 'API_TOOLBOX'
  }),
  clearStaticData = exports.clearStaticData = _createActions.clearStaticData,
  getStaticData = exports.getStaticData = _createActions.getStaticData,
  setStaticData = exports.setStaticData = _createActions.setStaticData;