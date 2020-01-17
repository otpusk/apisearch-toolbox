"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersActions = void 0;

var _reduxActions = require("redux-actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var offersActions = (0, _reduxActions.createActions)({
  GET_OFFER: function GET_OFFER(offerId) {
    var fresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return {
      offerId: offerId,
      fresh: fresh
    };
  },
  GET_OFFER_SUCCESS: function GET_OFFER_SUCCESS() {
    return void 0;
  },
  GET_OFFER_FAIL: function GET_OFFER_FAIL(error) {
    return error;
  },
  ADD_OFFERS: function ADD_OFFERS(offers) {
    return offers;
  },
  SET_OFFER: function SET_OFFER(offer) {
    return offer;
  },
  SET_OFFER_STATUS: function SET_OFFER_STATUS(offerId, status) {
    return {
      offerId: offerId,
      status: status
    };
  },
  CHECK_OFFER_STATUS: function CHECK_OFFER_STATUS(offerId, hotelId) {
    return {
      offerId: offerId,
      hotelId: hotelId
    };
  },
  CHECK_OFFER_STATUS_SUCCESS: function CHECK_OFFER_STATUS_SUCCESS(offerId, freshOffer) {
    return {
      offerId: offerId,
      freshOffer: freshOffer
    };
  },
  CHECK_OFFER_STATUS_FAIL: function CHECK_OFFER_STATUS_FAIL(error) {
    return error;
  },
  VALIDATE_OFFER_ADDITIONAL_COSTS: function VALIDATE_OFFER_ADDITIONAL_COSTS(offerId) {
    return {
      offerId: offerId
    };
  },
  VALIDATE_OFFER_ADDITIONAL_COSTS_SUCCESS: function VALIDATE_OFFER_ADDITIONAL_COSTS_SUCCESS(offerId, validatedTour) {
    return _objectSpread({
      offerId: offerId
    }, validatedTour);
  },
  VALIDATE_OFFER_ADDITIONAL_COSTS_FAIL: function VALIDATE_OFFER_ADDITIONAL_COSTS_FAIL(offerId, errorMsg) {
    return {
      offerId: offerId,
      errorMsg: errorMsg
    };
  },
  SET_OFFER_ADDITIONAL_COSTS_STATUS: function SET_OFFER_ADDITIONAL_COSTS_STATUS(offerId, status) {
    return {
      offerId: offerId,
      status: status
    };
  },
  VALIDATE_SET_PRICE: function VALIDATE_SET_PRICE(offerId, selectedFlights) {
    return {
      offerId: offerId,
      selectedFlights: selectedFlights
    };
  },
  VALIDATE_SET_PRICE_SUCCESS: function VALIDATE_SET_PRICE_SUCCESS(offerId, selectedFlights) {
    return {
      offerId: offerId,
      selectedFlights: selectedFlights
    };
  },
  VALIDATE_SET_PRICE_FAIL: function VALIDATE_SET_PRICE_FAIL(error) {
    return error;
  }
});
exports.offersActions = offersActions;