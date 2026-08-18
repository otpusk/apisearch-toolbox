"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsActions = void 0;
var _reduxActions = require("redux-actions");
const hotelsActions = exports.hotelsActions = (0, _reduxActions.createActions)({
  GET_HOTEL: hotelId => hotelId,
  GET_HOTEL_SUCCESS: hotel => hotel,
  GET_HOTEL_FAIL: error => error,
  ADD_HOTEL: hotel => hotel,
  ADD_HOTELS: hotels => hotels,
  GET_HOTELS_MARKERS: (countryId, cityId, center, radius) => ({
    countryId,
    cityId,
    center,
    radius
  }),
  GET_HOTELS_MARKERS_SUCCESS: markers => markers,
  GET_HOTELS_MARKERS_FAIL: error => error,
  GET_SIMILAR_HOTELS: hotelId => hotelId,
  GET_SIMILAR_HOTELS_SUCCESS: (hotelId, similarHotels) => ({
    hotelId,
    similarHotels
  }),
  GET_SIMILAR_HOTELS_FAIL: error => error,
  RESET_HOTELS_STORE: () => void 0,
  GET_DESCRIPTIONS_BY_OPERATOR: (operatorID, externalOperatorData) => ({
    operatorID,
    externalOperatorData
  }),
  GET_DESCRIPTIONS_BY_OPERATOR_SUCCESS: (operatorID, descriptions) => ({
    operatorID,
    descriptions
  }),
  GET_DESCRIPTIONS_BY_OPERATOR_FAIL: error => error
});