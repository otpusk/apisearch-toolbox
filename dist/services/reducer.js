"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesReducer = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _reduxActions = require("redux-actions");
var _actions = require("./actions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var initialState = {
  labels: {},
  store: {},
  booking: {}
};
var servicesReducer = exports.servicesReducer = (0, _reduxActions.handleActions)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _actions.servicesActions.setLabels, function (state, _ref) {
  var labels = _ref.payload;
  return R.set(R.lensProp('labels'), labels, state);
}), _actions.servicesActions.mergeLabels, function (state, _ref2) {
  var labels = _ref2.payload;
  return R.over(R.lensProp('labels'), function (prevLables) {
    return R.mergeAll([prevLables, labels]);
  }, state);
}), _actions.servicesActions.getServicesSuccess, function (state, _ref3) {
  var payload = _ref3.payload;
  var countryId = payload.countryId,
    services = payload.services;
  return R.set(R.lensPath(['store', countryId]), services, state);
}), _actions.servicesActions.setBookingServices, function (state, _ref4) {
  var payload = _ref4.payload;
  var key = payload.key,
    services = payload.services;
  return R.assocPath(['booking', key], services, state);
}), _actions.servicesActions.resetBookingServices, function (state, _ref5) {
  var key = _ref5.payload;
  return R.dissocPath(['booking', key], state);
}), _actions.servicesActions.setBookingServicesBySource, function (state, _ref6) {
  var payload = _ref6.payload;
  var key = payload.key,
    services = payload.services,
    source = payload.source;
  var prev = state.booking[key] || [];
  var next = R.pipe(R.reject(R.propEq(source, 'source')), R.concat(services))(prev);
  console.log(state.booking);
  console.log('key', key);
  console.log('source', source);
  console.log('prev', prev);
  console.log('next', next);
  console.log('/////////');
  return R.assocPath(['booking', key], next, state);
}), _actions.servicesActions.resetBookingServicesBySource, function (state, _ref7) {
  var payload = _ref7.payload;
  var key = payload.key,
    source = payload.source;
  var next = R.pipe(R.path(['booking', key]), R.reject(R.propEq(source, 'source')))(state);
  console.log('key', key);
  console.log('source', source);
  console.log('next', next);
  if (R.isEmpty(next)) {
    return R.dissocPath(['booking', key], state);
  }
  return R.assocPath(['booking', key], next, state);
}), initialState);