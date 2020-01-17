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

var getPriceChange = function getPriceChange(selected, validatedFlights) {
  var _ref = selected && validatedFlights[selected] || {},
      _ref$priceChange = _ref.priceChange,
      priceChange = _ref$priceChange === void 0 ? 0 : _ref$priceChange;

  return Number(priceChange);
};

var getValidatedTourNewPrice = function getValidatedTourNewPrice(state, offerId, selectedFlights) {
  var currency = state.getIn(['siblings', offerId, 'currency']);
  var offerPrice = state.getIn(['store', offerId, 'price', currency], 0);
  var actualPrice = state.getIn(['siblings', offerId, 'price', currency], 0);
  var validatedPrice = state.getIn(['validatedTour', offerId, 'price'], 0);
  var validatedFlights = state.getIn(['validatedTour', offerId, 'flights'], {});
  var selected = selectedFlights ? selectedFlights : state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
  var newPrice = (validatedPrice || actualPrice || offerPrice) + getPriceChange(selected.inbound, validatedFlights) + getPriceChange(selected.outbound, validatedFlights);
  return newPrice;
};

var offersReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.offersActions.addOffers, function (state, _ref2) {
  var newOffers = _ref2.payload;
  return state.updateIn(['store'], function (offers) {
    return offers.mergeWith(mergeOffer, newOffers);
  }).mergeIn(['status'], (0, _immutable.Map)(newOffers).map(function (offer, id) {
    return state.getIn(['status', id], 'alive');
  }));
}), _defineProperty(_handleActions, _actions.offersActions.setOffer, function (state, _ref3) {
  var offer = _ref3.payload;
  return state.updateIn(['store', offer.id], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(mergeOffer, offer).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.setOffer, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      offerId = _ref4$payload.offerId,
      status = _ref4$payload.status;
  return state.setIn(['status', offerId], status);
}), _defineProperty(_handleActions, _actions.offersActions.setOfferAdditionalCostsStatus, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
      offerId = _ref5$payload.offerId,
      status = _ref5$payload.status;
  return state.setIn(['validatedTour', offerId, 'isLoading'], status);
}), _defineProperty(_handleActions, _actions.offersActions.checkOfferStatusSuccess, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
      offerId = _ref6$payload.offerId,
      freshOffer = _ref6$payload.freshOffer;
  return state.updateIn(['siblings'], function (siblings) {
    return freshOffer ? siblings.set(offerId, freshOffer) : siblings;
  });
}), _defineProperty(_handleActions, _actions.offersActions.validateOfferAdditionalCostsSuccess, function (state, _ref7) {
  var payload = _ref7.payload;
  var newPrice = getValidatedTourNewPrice(state, payload.offerId);
  var newState = state.updateIn(['validatedTour', payload.offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(mergeOffer, _objectSpread({}, payload, {
      newPrice: newPrice,
      hasError: false,
      errorMsg: ''
    })).toJS();
  });
  return newState;
}), _defineProperty(_handleActions, _actions.offersActions.validateOfferAdditionalCostsFail, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
      offerId = _ref8$payload.offerId,
      errorMsg = _ref8$payload.errorMsg;
  var newState = state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(mergeOffer, {
      hasError: true,
      errorMsg: errorMsg
    }).toJS();
  });
  return newState;
}), _defineProperty(_handleActions, _actions.offersActions.validateSetPrice, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
      offerId = _ref9$payload.offerId,
      selectedFlights = _ref9$payload.selectedFlights;
  var newPrice = getValidatedTourNewPrice(state, offerId, selectedFlights);
  var newState = state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(mergeOffer, {
      newPrice: newPrice,
      selectedFlights: selectedFlights
    }).toJS();
  });
  return newState;
}), _handleActions), initalState);
exports.offersReducer = offersReducer;