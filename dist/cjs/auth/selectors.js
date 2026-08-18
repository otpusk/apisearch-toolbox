"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = exports.getLansAsQuery = exports.getLang = void 0;
const domain = _ => _.auth;
const getLang = state => {
  return domain(state).getIn(['otpusk', 'lang'], 'ru');
};
exports.getLang = getLang;
const getLansAsQuery = state => {
  return {
    lang: getLang(state)
  };
};
exports.getLansAsQuery = getLansAsQuery;
const getToken = state => {
  return domain(state).getIn(['otpusk', 'token']);
};
exports.getToken = getToken;