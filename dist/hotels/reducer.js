"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsReducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _ramda = require("ramda");
var _actions = require("./actions");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var initalState = (0, _immutable.Map)({
  'store': (0, _immutable.Map)(),
  'markers': (0, _immutable.Map)(),
  'similar': (0, _immutable.Map)(),
  descriptionsByOperator: {}
});
var hotelsReducer = exports.hotelsReducer = (0, _reduxActions.handleActions)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, (0, _reduxActions.combineActions)(_actions.hotelsActions.addHotel, _actions.hotelsActions.getHotelSuccess), function (state, _ref) {
  var hotel = _ref.payload;
  return state.setIn(['store', String(hotel.id)], hotel);
}), _actions.hotelsActions.addHotels, function (state, _ref2) {
  var hotels = _ref2.payload;
  return state.updateIn(['store'], function (store) {
    return store.merge(hotels);
  });
}), _actions.hotelsActions.getHotelsMarkersSuccess, function (state, _ref3) {
  var markers = _ref3.payload;
  return state.mergeIn(['markers'], markers);
}), _actions.hotelsActions.getSimilarHotelsSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
    hotelId = _ref4$payload.hotelId,
    similarHotels = _ref4$payload.similarHotels;
  return state.setIn(['similar', hotelId], (0, _immutable.Map)(similarHotels));
}), _actions.hotelsActions.resetHotelsStore, function () {
  return (0, _ramda.clone)(initalState);
}), _actions.hotelsActions.getDescriptionsByOperatorSuccess, function (state, _ref5) {
  var payload = _ref5.payload;
  var operatorID = payload.operatorID,
    descriptions = payload.descriptions;
  return state.setIn(['descriptionsByOperator', operatorID], descriptions);
}), initalState);