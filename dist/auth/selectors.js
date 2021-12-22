"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLang = void 0;

var _reselect = require("reselect");

var domain = function domain(_) {
  return _.auth;
};

var getLang = (0, _reselect.createSelector)(domain, function (auth) {
  return auth.getIn(['otpusk', 'lang'], 'rus');
});
exports.getLang = getLang;