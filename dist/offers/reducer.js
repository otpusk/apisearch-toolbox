"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _mergeOffer = require("./utils/mergeOffer");

var _getValidatedTourPrice = require("./utils/getValidatedTourPrice");

var _handleActions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var initalState = (0, _immutable.Map)({
  store: (0, _immutable.Map)(),
  status: (0, _immutable.Map)(),
  siblings: (0, _immutable.Map)(),
  validatedTour: (0, _immutable.Map)()
});
var offersReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.offersActions.addOffers, function (state, _ref) {
  var newOffers = _ref.payload;
  return state.updateIn(['store'], function (offers) {
    return offers.mergeWith(_mergeOffer.mergeOffer, newOffers);
  }).mergeIn(['status'], (0, _immutable.Map)(newOffers).map(function (offer, id) {
    return state.getIn(['status', id], 'alive');
  }));
}), _defineProperty(_handleActions, _actions.offersActions.setOffer, function (state, _ref2) {
  var offer = _ref2.payload;
  return state.updateIn(['store', offer.id], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(_mergeOffer.mergeOffer, offer).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.setOfferStatus, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
      offerId = _ref3$payload.offerId,
      status = _ref3$payload.status;
  return state.setIn(['status', offerId], status);
}), _defineProperty(_handleActions, _actions.offersActions.setOfferAdditionalCostsStatus, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      offerId = _ref4$payload.offerId,
      status = _ref4$payload.status;
  return state.setIn(['validatedTour', offerId, 'isLoading'], status);
}), _defineProperty(_handleActions, _actions.offersActions.checkOfferStatusSuccess, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
      offerId = _ref5$payload.offerId,
      freshOffer = _ref5$payload.freshOffer;
  return state.updateIn(['siblings'], function (siblings) {
    return freshOffer ? siblings.set(offerId, freshOffer) : siblings;
  });
}), _defineProperty(_handleActions, _actions.offersActions.validateOfferAdditionalCostsSuccess, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
      offerId = _ref6$payload.offerId,
      price = _ref6$payload.price,
      flights = _ref6$payload.flights,
      rest = _objectWithoutProperties(_ref6$payload, ["offerId", "price", "flights"]);

  var currency = state.getIn(['store', offerId, 'currency'], 'usd');
  var newPrice = price[currency] ? price[currency] + (0, _getValidatedTourPrice.getSelectedFlightsPriceChange)(state, offerId, {
    flights: flights
  }) : (0, _getValidatedTourPrice.getValidatedTourNewPrice)(state, offerId);
  return state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(_mergeOffer.mergeOfferNextPriority, _objectSpread({
      offerId: offerId,
      price: price,
      newPrice: newPrice,
      flights: flights,
      hasError: false,
      error: null
    }, rest)).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.validateOfferAdditionalCostsFail, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
      offerId = _ref7$payload.offerId,
      error = _ref7$payload.error;
  return state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(_mergeOffer.mergeOfferNextPriority, {
      hasError: true,
      error: error
    }).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.validateSetPrice, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
      offerId = _ref8$payload.offerId,
      selectedFlights = _ref8$payload.selectedFlights;
  var newPrice = (0, _getValidatedTourPrice.getValidatedTourNewPrice)(state, offerId, selectedFlights);
  return state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(_mergeOffer.mergeOfferNextPriority, {
      newPrice: newPrice,
      selectedFlights: selectedFlights
    }).toJS();
  });
}), _handleActions), initalState);
exports.offersReducer = offersReducer;