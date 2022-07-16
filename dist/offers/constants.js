"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXPIRED_OFFER_STATUS = exports.ALIVE_OFFER_STATUS = exports.ACTUALIZED_OFFER_STATUS = void 0;
var ACTUALIZED_OFFER_STATUS = {
  ACTUALIZED: 'actualized',
  UPDATED: 'updated',
  NEW_PRICE: 'new_price',
  NOT_FOUND: 'not_found',
  ERROR_OPERATOR_CONNECTION: 'error_operator_connection',
  INVALID_REQUEST: 'invalid_request',
  STOP_SALE_BY_TRANSPORT_TO: 'stop_sale_by_transport_to',
  STOP_SALE_BY_TRANSPORT_FROM: 'stop_sale_by_transport_from'
};
exports.ACTUALIZED_OFFER_STATUS = ACTUALIZED_OFFER_STATUS;
var ALIVE_OFFER_STATUS = 'alive';
exports.ALIVE_OFFER_STATUS = ALIVE_OFFER_STATUS;
var EXPIRED_OFFER_STATUS = 'expired';
exports.EXPIRED_OFFER_STATUS = EXPIRED_OFFER_STATUS;