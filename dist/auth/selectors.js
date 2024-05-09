"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = exports.getLang = void 0;
var _reselect = require("reselect");
var domain = function domain(_) {
  return _.auth;
};
var getLang = exports.getLang = (0, _reselect.createSelector)(domain, function (auth) {
  return auth.getIn(['otpusk', 'lang'], 'rus');
});
var getToken = exports.getToken = (0, _reselect.createSelector)(domain, function (auth) {
  return auth.getIn(['otpusk', 'token']);
});