"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _handleActions;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var initalState = (0, _immutable.Map)({
  store: (0, _immutable.Map)(),
  status: (0, _immutable.Map)(),
  siblings: (0, _immutable.Map)(),
  validatedTour: (0, _immutable.Map)()
});

var mergeOffer = function mergeOffer(prev, next) {
  return next && _typeof(next) === 'object' && !next[Symbol.iterator] ? _objectSpread({}, prev, {}, next) : next ? next : prev;
};

var mergeOfferNextPriority = function mergeOfferNextPriority(prev, next) {
  return next && _typeof(next) === 'object' && !next[Symbol.iterator] ? _objectSpread({}, prev, {}, next) : next;
};

var getPriceChange = function getPriceChange(selectedCode, validatedFlights) {
  var _ref = selectedCode && validatedFlights[selectedCode] || {},
      _ref$priceChange = _ref.priceChange,
      priceChange = _ref$priceChange === void 0 ? 0 : _ref$priceChange;

  return Number(priceChange);
};

var getSelectedFlightsPriceChange = function getSelectedFlightsPriceChange(state, offerId, _ref2) {
  var selectedFlights = _ref2.selectedFlights,
      flights = _ref2.flights;
  var validatedFlights = flights || state.getIn(['validatedTour', offerId, 'flights'], {});
  var selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
  var selectedInbound = selected.inbound && selected.inbound.split('_')[0];
  var selectedOutbound = selected.outbound && selected.outbound.split('_')[0];
  return getPriceChange(selectedInbound, validatedFlights) + getPriceChange(selectedOutbound, validatedFlights);
};

var getValidatedTourNewPrice = function getValidatedTourNewPrice(state, offerId, selectedFlights) {
  var currency = state.getIn(['siblings', offerId, 'currency']);
  var offerPrice = state.getIn(['store', offerId, 'price', currency], 0);
  var actualPrice = state.getIn(['siblings', offerId, 'price', currency], 0);
  var validatedPrice = state.getIn(['validatedTour', offerId, 'price'], 0);
  var selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
  var newPrice = (validatedPrice || actualPrice || offerPrice) + getSelectedFlightsPriceChange(state, offerId, {
    selectedFlights: selected
  });
  return newPrice;
};

var offersReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.offersActions.addOffers, function (state, _ref3) {
  var newOffers = _ref3.payload;
  return state.updateIn(['store'], function (offers) {
    return offers.mergeWith(mergeOffer, newOffers);
  }).mergeIn(['status'], (0, _immutable.Map)(newOffers).map(function (offer, id) {
    return state.getIn(['status', id], 'alive');
  }));
}), _defineProperty(_handleActions, _actions.offersActions.setOffer, function (state, _ref4) {
  var offer = _ref4.payload;
  return state.updateIn(['store', offer.id], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(mergeOffer, offer).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.setOffer, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
      offerId = _ref5$payload.offerId,
      status = _ref5$payload.status;
  return state.setIn(['status', offerId], status);
}), _defineProperty(_handleActions, _actions.offersActions.setOfferAdditionalCostsStatus, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
      offerId = _ref6$payload.offerId,
      status = _ref6$payload.status;
  return state.setIn(['validatedTour', offerId, 'isLoading'], status);
}), _defineProperty(_handleActions, _actions.offersActions.checkOfferStatusSuccess, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
      offerId = _ref7$payload.offerId,
      freshOffer = _ref7$payload.freshOffer;
  return state.updateIn(['siblings'], function (siblings) {
    return freshOffer ? siblings.set(offerId, freshOffer) : siblings;
  });
}), _defineProperty(_handleActions, _actions.offersActions.validateOfferAdditionalCostsSuccess, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
      offerId = _ref8$payload.offerId,
      price = _ref8$payload.price,
      flights = _ref8$payload.flights,
      rest = _objectWithoutProperties(_ref8$payload, ["offerId", "price", "flights"]);

  var newPrice = price ? price + getSelectedFlightsPriceChange(state, offerId, {
    flights: flights
  }) : getValidatedTourNewPrice(state, offerId);
  var newState = state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(mergeOfferNextPriority, _objectSpread({
      offerId: offerId,
      price: price,
      flights: flights,
      newPrice: newPrice,
      hasError: false,
      errorMsg: ''
    }, rest)).toJS();
  });
  return newState;
}), _defineProperty(_handleActions, _actions.offersActions.validateOfferAdditionalCostsFail, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
      offerId = _ref9$payload.offerId,
      errorMsg = _ref9$payload.errorMsg;
  var newPrice = getValidatedTourNewPrice(state, offerId);
  var newState = state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(mergeOfferNextPriority, {
      hasError: true,
      errorMsg: errorMsg,
      newPrice: newPrice
    }).toJS();
  });
  return newState;
}), _defineProperty(_handleActions, _actions.offersActions.validateSetPrice, function (state, _ref10) {
  var _ref10$payload = _ref10.payload,
      offerId = _ref10$payload.offerId,
      selectedFlights = _ref10$payload.selectedFlights;
  var newPrice = getValidatedTourNewPrice(state, offerId, selectedFlights);
  var newState = state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(mergeOfferNextPriority, {
      newPrice: newPrice,
      selectedFlights: selectedFlights
    }).toJS();
  });
  return newState;
}), _handleActions), initalState);
exports.offersReducer = offersReducer;