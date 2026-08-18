"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServicesWorker = getServicesWorker;
var _effects = require("redux-saga/effects");
var R = _interopRequireWildcard(require("ramda"));
var _jsonApi = require("@otpusk/json-api");
var _actions = require("../../actions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const groupMapperLabelKeys = group => R.map(R.pipe(R.keys, _ref => {
  let [labelKey] = _ref;
  return labelKey;
}), group);
const normalizeServices = services => R.call(R.pipe(R.toPairs, R.map(_ref2 => {
  let [serviceKey, group] = _ref2;
  return [serviceKey, groupMapperLabelKeys(group)];
}), R.fromPairs), services);
const extractLabels = services => R.call(R.pipe(R.omit(['byCountries', 'chains']), R.toPairs, R.map(_ref3 => {
  let [, group] = _ref3;
  return group;
}), R.flatten, R.reduce((result, service) => R.mergeAll([result, service]), {})), services);
function getServicesWorker(_ref4) {
  let {
    payload: {
      countryId,
      options = {}
    }
  } = _ref4;
  return function* () {
    const {
      withIcons,
      fresh
    } = options;
    try {
      const {
        token,
        lang
      } = yield (0, _effects.select)(_ref5 => {
        let {
          auth
        } = _ref5;
        return {
          token: auth.getIn(['otpusk', 'token']),
          lang: auth.getIn(['otpusk', 'lang'])
        };
      });
      const services = yield (0, _effects.call)(_jsonApi.getToursServices, token, countryId, lang, withIcons, fresh);
      yield (0, _effects.put)(_actions.servicesActions.mergeLabels(extractLabels(services)));
      yield (0, _effects.put)(_actions.servicesActions.getServicesSuccess(countryId, normalizeServices(services)));
    } catch (error) {
      yield (0, _effects.put)(_actions.servicesActions.getServicesFail(error));
    }
  }();
}