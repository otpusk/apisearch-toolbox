"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersActions = void 0;

var _reduxActions = require("redux-actions");

// Core
var offersActions = (0, _reduxActions.createActions)({
  GET_OFFER: function GET_OFFER(offerId) {
    return offerId;
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
  }
});
exports.offersActions = offersActions;