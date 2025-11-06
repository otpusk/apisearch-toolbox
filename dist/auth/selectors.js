"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = exports.getLansAsQuery = exports.getLang = void 0;
var domain = function domain(_) {
  return _.auth;
};
var getLang = exports.getLang = function getLang(state) {
  return domain(state).getIn(['otpusk', 'lang'], 'ru');
};
var getLansAsQuery = exports.getLansAsQuery = function getLansAsQuery(state) {
  return {
    lang: getLang(state)
  };
};
var getToken = exports.getToken = function getToken(state) {
  return domain(state).getIn(['otpusk', 'token']);
};