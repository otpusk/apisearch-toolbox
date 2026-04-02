"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsActions = void 0;
var _reduxActions = require("redux-actions");
var hotelsActions = exports.hotelsActions = (0, _reduxActions.createActions)({
  GET_HOTEL: function GET_HOTEL(hotelId) {
    return hotelId;
  },
  GET_HOTEL_SUCCESS: function GET_HOTEL_SUCCESS(hotel) {
    return hotel;
  },
  GET_HOTEL_FAIL: function GET_HOTEL_FAIL(error) {
    return error;
  },
  ADD_HOTEL: function ADD_HOTEL(hotel) {
    return hotel;
  },
  ADD_HOTELS: function ADD_HOTELS(hotels) {
    return hotels;
  },
  GET_HOTELS_MARKERS: function GET_HOTELS_MARKERS(countryId, cityId, center, radius) {
    return {
      countryId: countryId,
      cityId: cityId,
      center: center,
      radius: radius
    };
  },
  GET_HOTELS_MARKERS_SUCCESS: function GET_HOTELS_MARKERS_SUCCESS(markers) {
    return markers;
  },
  GET_HOTELS_MARKERS_FAIL: function GET_HOTELS_MARKERS_FAIL(error) {
    return error;
  },
  GET_SIMILAR_HOTELS: function GET_SIMILAR_HOTELS(hotelId) {
    return hotelId;
  },
  GET_SIMILAR_HOTELS_SUCCESS: function GET_SIMILAR_HOTELS_SUCCESS(hotelId, similarHotels) {
    return {
      hotelId: hotelId,
      similarHotels: similarHotels
    };
  },
  GET_SIMILAR_HOTELS_FAIL: function GET_SIMILAR_HOTELS_FAIL(error) {
    return error;
  },
  RESET_HOTELS_STORE: function RESET_HOTELS_STORE() {
    return void 0;
  },
  GET_DESCRIPTIONS_BY_OPERATOR: function GET_DESCRIPTIONS_BY_OPERATOR(operatorID, externalOperatorData) {
    return {
      operatorID: operatorID,
      externalOperatorData: externalOperatorData
    };
  },
  GET_DESCRIPTIONS_BY_OPERATOR_SUCCESS: function GET_DESCRIPTIONS_BY_OPERATOR_SUCCESS(operatorID, descriptions) {
    return {
      operatorID: operatorID,
      descriptions: descriptions
    };
  },
  GET_DESCRIPTIONS_BY_OPERATOR_FAIL: function GET_DESCRIPTIONS_BY_OPERATOR_FAIL(error) {
    return error;
  }
});