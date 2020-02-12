"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _handleActions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initalState = (0, _immutable.Map)({
  'store': (0, _immutable.Map)(),
  'markers': (0, _immutable.Map)(),
  'similar': (0, _immutable.Map)()
});

var mergeTwoHotelsWithOffers = function mergeTwoHotelsWithOffers(fresh, base) {
  var offersFresh = fresh.offers;
  var offersBase = base.offers;
  return _objectSpread({}, base, {}, fresh, {
    offers: (0, _immutable.Set)(offersFresh).union(offersBase).toArray()
  });
};

var hotelsReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, (0, _reduxActions.combineActions)(_actions.hotelsActions.addHotel, _actions.hotelsActions.getHotelSuccess), function (state, _ref) {
  var hotel = _ref.payload;
  return state.updateIn(['store', String(hotel.id)], function (current) {
    return current ? mergeTwoHotelsWithOffers(hotel, current) : hotel;
  });
}), _defineProperty(_handleActions, _actions.hotelsActions.addHotels, function (state, _ref2) {
  var hotels = _ref2.payload;
  return state.updateIn(['store'], function (store) {
    return store.mergeWith(mergeTwoHotelsWithOffers, hotels);
  });
}), _defineProperty(_handleActions, _actions.hotelsActions.getHotelsMarkersSuccess, function (state, _ref3) {
  var markers = _ref3.payload;
  return state.mergeIn(['markers'], markers);
}), _defineProperty(_handleActions, _actions.hotelsActions.getSimilarHotelsSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      hotelId = _ref4$payload.hotelId,
      similarHotels = _ref4$payload.similarHotels;
  return state.setIn(['similar', hotelId], (0, _immutable.Map)(similarHotels));
}), _handleActions), initalState);
exports.hotelsReducer = hotelsReducer;