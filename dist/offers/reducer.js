"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersReducer = void 0;
var _reduxActions = require("redux-actions");
var R = _interopRequireWildcard(require("ramda"));
var _actions = require("./actions");
var _constants = require("./constants");
var _helpers = require("./helpers");
var _handleActions;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var initalState = {
  store: {},
  status: {},
  actualizedOffers: {}
};
var offersReducer = exports.offersReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_handleActions, _actions.offersActions.addOffers, function (state, _ref) {
  var nextOffers = _ref.payload;
  return R.call(R.pipe(R.over(R.lensProp('store'), function (offers) {
    return R.mergeAll([offers, nextOffers]);
  }), R.over(R.lensProp('status'), function (statuesAsMap) {
    return R.mergeAll([statuesAsMap, R.mapObjIndexed(R.always(_constants.ALIVE_OFFER_STATUS), nextOffers)]);
  })), state);
}), _actions.offersActions.setOffer, function (state, _ref2) {
  var _ref2$payload = _ref2.payload,
    offerID = _ref2$payload.offerID,
    offer = _ref2$payload.offer;
  var prevOffer = R.path(['store', offerID], state);
  var nextOffer = prevOffer ? R.over(R.lensProp('price'), function (price) {
    return R.mergeAll([price, prevOffer.price]);
  }, offer) : offer;
  return R.assocPath(['store', offerID], nextOffer, state);
}), _actions.offersActions.setOfferStatus, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
    offerID = _ref3$payload.offerID,
    status = _ref3$payload.status;
  return R.assocPath(['status', offerID], status, state);
}), _actions.offersActions.setActualizedOffer, function (state, _ref4) {
  var payload = _ref4.payload;
  return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('offer', payload.offer)), state);
}), _actions.offersActions.setActualizedStatus, function (state, _ref5) {
  var payload = _ref5.payload;
  return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('actualizedStatus', payload.status)), state);
}), _actions.offersActions.startActualizeOffer, function (state, _ref6) {
  var offerID = _ref6.payload;
  return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('loading', true)), state);
}), _actions.offersActions.endActualizeOffer, function (state, _ref7) {
  var offerID = _ref7.payload;
  return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('loading', false), R.assoc('completed', true)), state);
}), _actions.offersActions.setMessageByActualizedOffer, function (state, _ref8) {
  var payload = _ref8.payload;
  return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('message', payload.message)), state);
}), _actions.offersActions.failActualizedOffer, function (state, _ref9) {
  var offerID = _ref9.payload;
  return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('error', true)), state);
}), _actions.offersActions.clearActualizedOffer, function (state, _ref10) {
  var offerID = _ref10.payload;
  return R.over(R.lensProp('actualizedOffers'), R.omit([offerID]), state);
}), _defineProperty(_handleActions, _actions.offersActions.resetOffersStore, function () {
  return R.clone(initalState);
})), initalState);