"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersActions = void 0;

var _reduxActions = require("redux-actions");

var offersActions = (0, _reduxActions.createActions)({
  GET_OFFER: function GET_OFFER(offerId) {
    var fresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var currency = arguments.length > 2 ? arguments[2] : undefined;
    return {
      offerId: offerId,
      fresh: fresh,
      currency: currency
    };
  },
  GET_OFFER_SUCCESS: function GET_OFFER_SUCCESS(offerID) {
    return offerID;
  },
  GET_OFFER_FAIL: [function (error) {
    return error;
  }, function (_, offerID) {
    return {
      offerID: offerID
    };
  }],
  ADD_OFFERS: function ADD_OFFERS(offers) {
    return offers;
  },
  SET_OFFER: function SET_OFFER(offer) {
    return offer;
  },
  SET_OFFER_STATUS: function SET_OFFER_STATUS(offerID, status) {
    return {
      offerID: offerID,
      status: status
    };
  },
  ACTUALIZE_OFFER: function ACTUALIZE_OFFER(offerID, adults, children, currency) {
    return {
      offerID: offerID,
      adults: adults,
      children: children,
      currency: currency
    };
  },
  SET_ACTUALIZED_OFFER: function SET_ACTUALIZED_OFFER(offerID, offer) {
    return {
      offerID: offerID,
      offer: offer
    };
  },
  SET_ACTUALIZED_STATUS: function SET_ACTUALIZED_STATUS(offerID, status) {
    return {
      offerID: offerID,
      status: status
    };
  },
  START_ACTUALIZE_OFFER: function START_ACTUALIZE_OFFER(offerID) {
    return offerID;
  },
  END_ACTUALIZE_OFFER: function END_ACTUALIZE_OFFER(offerID) {
    return offerID;
  },
  FAIL_ACTUALIZE_OFFER: function FAIL_ACTUALIZE_OFFER(offerID) {
    return offerID;
  },
  CLEAR_ACTUALIZED_OFFER: function CLEAR_ACTUALIZED_OFFER(offerID) {
    return offerID;
  },
  SET_MESSAGE_BY_ACTUALIZED_OFFER: function SET_MESSAGE_BY_ACTUALIZED_OFFER(offerID, message) {
    return {
      offerID: offerID,
      message: message
    };
  }
});
exports.offersActions = offersActions;