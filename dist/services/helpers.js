"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBookingServicesKey = void 0;

var createBookingServicesKey = function createBookingServicesKey(offerID, currency) {
  return "".concat(offerID, "-").concat(currency);
};

exports.createBookingServicesKey = createBookingServicesKey;