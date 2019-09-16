"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _handleActions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var initalState = (0, _immutable.Map)({
  store: (0, _immutable.Map)(),
  status: (0, _immutable.Map)(),
  siblings: (0, _immutable.Map)()
});
var offersReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.offersActions.addOffers, function (state, _ref) {
  var newOffers = _ref.payload;
  return state.updateIn(['store'], function (offers) {
    return offers.mergeDeepWith(function (a, b) {
      return _typeof(b) === 'object' ? _objectSpread({}, b, {}, a) : b ? b : a;
    }, newOffers);
  }).mergeIn(['status'], (0, _immutable.Map)(newOffers).map(function (offer, id) {
    return state.getIn(['status', id], 'alive');
  }));
}), _defineProperty(_handleActions, _actions.offersActions.setOffer, function (state, _ref2) {
  var offer = _ref2.payload;
  return state.updateIn(['store', offer.id], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(function (prev, next) {
      return next || prev;
    }, offer).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.setOfferStatus, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
      offerId = _ref3$payload.offerId,
      status = _ref3$payload.status;
  return state.setIn(['status', offerId], status);
}), _defineProperty(_handleActions, _actions.offersActions.checkOfferStatusSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      offerId = _ref4$payload.offerId,
      freshOffer = _ref4$payload.freshOffer;
  return state.updateIn(['siblings'], function (siblings) {
    return freshOffer ? siblings.set(offerId, freshOffer) : siblings;
  });
}), _handleActions), initalState);
exports.offersReducer = offersReducer;