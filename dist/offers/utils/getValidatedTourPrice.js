"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValidatedTourNewPrice = exports.getValidatedTourPrice = exports.getSelectedFlightsPriceChange = exports.getPriceChange = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getPriceChange = function getPriceChange(selectedCode, validatedFlights) {
  var selectedCodeWithoutIndex = selectedCode && selectedCode.split(/_/).slice(0, -1).join('_');

  var _ref = validatedFlights[selectedCodeWithoutIndex] || {},
      _ref$priceChange = _ref.priceChange,
      priceChange = _ref$priceChange === void 0 ? 0 : _ref$priceChange;

  return Number(priceChange);
};

exports.getPriceChange = getPriceChange;

var getSelectedFlightsPriceChange = function getSelectedFlightsPriceChange(state, offerId, _ref2) {
  var selectedFlights = _ref2.selectedFlights,
      flights = _ref2.flights;
  var validatedFlights = flights || state.getIn(['validatedTour', offerId, 'flights'], {});
  var selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
  var selectedInbound = selected.inbound;
  var selectedOutbound = selected.outbound;
  return getPriceChange(selectedInbound, validatedFlights) + getPriceChange(selectedOutbound, validatedFlights);
};

exports.getSelectedFlightsPriceChange = getSelectedFlightsPriceChange;

var getValidatedTourPrice = function getValidatedTourPrice(state, offerId, currency) {
  var offerPrice = state.getIn(['store', offerId, 'price'].concat(_toConsumableArray(currency ? [currency] : [])), currency ? 0 : {});
  var actualPrice = state.getIn(['siblings', offerId, 'price'].concat(_toConsumableArray(currency ? [currency] : [])), currency ? 0 : {});
  var validatedPrice = state.getIn(['validatedTour', offerId, 'price'].concat(_toConsumableArray(currency ? [currency] : [])), currency ? 0 : {});
  var price = validatedPrice || actualPrice || offerPrice;
  return price;
};

exports.getValidatedTourPrice = getValidatedTourPrice;

var getValidatedTourNewPrice = function getValidatedTourNewPrice(state, offerId, selectedFlights) {
  var currency = state.getIn(['store', offerId, 'currency'], 'usd');
  var selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
  var newPrice = getValidatedTourPrice(state, offerId, currency) + getSelectedFlightsPriceChange(state, offerId, {
    selectedFlights: selected
  });
  return newPrice;
};

exports.getValidatedTourNewPrice = getValidatedTourNewPrice;