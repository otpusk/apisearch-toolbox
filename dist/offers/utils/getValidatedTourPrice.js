"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumByKey = exports.getValidatedTourNewPrice = exports.getValidatedTourPrice = exports.getSelectedFlightsPriceChange = exports.getPriceChange = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sumByKey = function sumByKey(obj1, obj2) {
  var res = {};

  for (var _i = 0, _Object$entries = Object.entries(obj1); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (obj2.hasOwnProperty(key)) {
      res[key] = Number(value) + Number(obj2[key]);
    }
  }

  return res;
};

exports.sumByKey = sumByKey;

var getPriceChange = function getPriceChange(selectedCode, validatedFlights) {
  var selectedCodeWithoutIndex = selectedCode && selectedCode.split(/_/).slice(0, -1).join('_');

  var _ref = validatedFlights && validatedFlights[selectedCodeWithoutIndex] || {},
      _ref$priceChange = _ref.priceChange,
      priceChange = _ref$priceChange === void 0 ? {
    usd: 0,
    eur: 0,
    uah: 0
  } : _ref$priceChange;

  return priceChange;
};

exports.getPriceChange = getPriceChange;

var getSelectedFlightsPriceChange = function getSelectedFlightsPriceChange(state, offerId, _ref2) {
  var selectedFlights = _ref2.selectedFlights,
      flights = _ref2.flights;
  var validatedFlights = flights || state.getIn(['validatedTour', offerId, 'flights'], {});
  var selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
  var selectedInbound = selected.inbound;
  var selectedOutbound = selected.outbound;
  return sumByKey(getPriceChange(selectedInbound, validatedFlights), getPriceChange(selectedOutbound, validatedFlights));
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
  var selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
  var newPrice = sumByKey(getValidatedTourPrice(state, offerId), getSelectedFlightsPriceChange(state, offerId, {
    selectedFlights: selected
  }));
  return newPrice;
};

exports.getValidatedTourNewPrice = getValidatedTourNewPrice;