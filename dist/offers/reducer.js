"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initalState = {
  store: {},
  status: {},
  actualizedOffers: {}
};
var offersReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.offersActions.addOffers, function (state, _ref) {
  var nextOffers = _ref.payload;
  return R.call(R.pipe(R.over(R.lensProp('store'), function (offers) {
    return R.mergeAll([offers, nextOffers]);
  }), R.over(R.lensProp('status'), function (statuesAsMap) {
    return R.mergeAll([statuesAsMap, R.mapObjIndexed(R.always(_constants.ALIVE_OFFER_STATUS), nextOffers)]);
  })), state);
}), _defineProperty(_handleActions, _actions.offersActions.setOffer, function (state, _ref2) {
  var offer = _ref2.payload;
  return R.assocPath(['store', offer.id], offer, state);
}), _defineProperty(_handleActions, _actions.offersActions.setOfferStatus, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
      offerID = _ref3$payload.offerID,
      status = _ref3$payload.status;
  return R.assocPath(['status', offerID], status, state);
}), _defineProperty(_handleActions, _actions.offersActions.setActualizedOffer, function (state, _ref4) {
  var payload = _ref4.payload;
  return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('offer', payload.offer)), state);
}), _defineProperty(_handleActions, _actions.offersActions.setActualizedStatus, function (state, _ref5) {
  var payload = _ref5.payload;
  return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('actualizedStatus', payload.status)), state);
}), _defineProperty(_handleActions, _actions.offersActions.startActualizeOffer, function (state, _ref6) {
  var offerID = _ref6.payload;
  return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('loading', true)), state);
}), _defineProperty(_handleActions, _actions.offersActions.endActualizeOffer, function (state, _ref7) {
  var offerID = _ref7.payload;
  return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('loading', false), R.assoc('completed', true)), state);
}), _defineProperty(_handleActions, _actions.offersActions.setMessageByActualizedOffer, function (state, _ref8) {
  var payload = _ref8.payload;
  return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('message', payload.message)), state);
}), _defineProperty(_handleActions, _actions.offersActions.failActualizedOffer, function (state, _ref9) {
  var offerID = _ref9.payload;
  return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('error', true)), state);
}), _defineProperty(_handleActions, _actions.offersActions.clearActualizedOffer, function (state, _ref10) {
  var offerID = _ref10.payload;
  return R.over(R.lensProp('actualizedOffers'), R.omit([offerID]), state);
}), _handleActions), initalState);
exports.offersReducer = offersReducer;