"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesReducer = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _reduxActions = require("redux-actions");
var _actions = require("./actions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const initialState = {
  labels: {},
  store: {},
  booking: {}
};
const servicesReducer = exports.servicesReducer = (0, _reduxActions.handleActions)({
  [_actions.servicesActions.setLabels]: (state, _ref) => {
    let {
      payload: labels
    } = _ref;
    return R.set(R.lensProp('labels'), labels, state);
  },
  [_actions.servicesActions.mergeLabels]: (state, _ref2) => {
    let {
      payload: labels
    } = _ref2;
    return R.over(R.lensProp('labels'), prevLables => R.mergeAll([prevLables, labels]), state);
  },
  [_actions.servicesActions.getServicesSuccess]: (state, _ref3) => {
    let {
      payload
    } = _ref3;
    const {
      countryId,
      services
    } = payload;
    return R.set(R.lensPath(['store', countryId]), services, state);
  },
  [_actions.servicesActions.setBookingServices]: (state, _ref4) => {
    let {
      payload
    } = _ref4;
    const {
      key,
      services
    } = payload;
    return R.assocPath(['booking', key], services, state);
  },
  [_actions.servicesActions.resetBookingServices]: (state, _ref5) => {
    let {
      payload: key
    } = _ref5;
    return R.dissocPath(['booking', key], state);
  }
}, initialState);