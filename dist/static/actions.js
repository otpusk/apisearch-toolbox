"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStaticData = exports.getStaticData = exports.clearStaticData = void 0;
var _reduxActions = require("redux-actions");
const {
  clearStaticData,
  getStaticData,
  setStaticData
} = (0, _reduxActions.createActions)({
  clearStaticData: () => void 0,
  getStaticData: () => void 0,
  setStaticData: data => data
}, {
  prefix: 'API_TOOLBOX'
});
exports.setStaticData = setStaticData;
exports.getStaticData = getStaticData;
exports.clearStaticData = clearStaticData;