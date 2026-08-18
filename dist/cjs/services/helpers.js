"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBookingServicesKey = void 0;
const createBookingServicesKey = (offerID, currency) => `${offerID}-${currency}`;
exports.createBookingServicesKey = createBookingServicesKey;