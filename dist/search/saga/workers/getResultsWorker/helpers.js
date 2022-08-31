"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnusedPrices = exports.getOffersEntitiesMap = exports.getIgnoreOperators = exports.getHotelsIDsFromPrices = exports.getHotelsEntitiesMap = exports.generateNextPrices = exports.addIgnoreOperators = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _constants = require("./constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getIgnoreOperators = function getIgnoreOperators(operators) {
  return R.call(R.pipe(R.toPairs, R.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        isReady = _ref2[1];

    return isReady;
  }), R.map(R.head)), operators);
};

exports.getIgnoreOperators = getIgnoreOperators;

var stringifyOperators = function stringifyOperators(operators) {
  return R.join(',', operators);
};

var addIgnoreOperators = function addIgnoreOperators(query, ignoreOperators) {
  return R.call(R.pipe(stringifyOperators, function (stringifyIgnoreOperators) {
    return query.ignoreOperators = query.ignoreOperators ? R.concat("".concat(query.ignoreOperators, ","), stringifyIgnoreOperators) : stringifyIgnoreOperators;
  }), ignoreOperators);
};

exports.addIgnoreOperators = addIgnoreOperators;

var getHotelsIDsFromPrices = function getHotelsIDsFromPrices(prices) {
  return R.map(R.prop('hotelID'), prices);
};

exports.getHotelsIDsFromPrices = getHotelsIDsFromPrices;

var sortOffers = function sortOffers(offersHub, currency) {
  return function (offers) {
    return R.call(R.pipe(R.map(function (offerID) {
      return offersHub[offerID];
    }), R.sort(R.ascend(R.path(['price', currency])))), offers);
  };
};

var sortPrices = function sortPrices(currency) {
  return function (prices) {
    return R.sort(R.ascend(R.path(['offers', 0, 'price', currency])), prices);
  };
};

var convertPricesListToMap = function convertPricesListToMap(prices) {
  return R.reduce(function (acc, price) {
    return R.over(R.lensProp(price.hotelID), function (prevPrice) {
      return prevPrice ? R.over(R.lensProp('offers'), function (offers) {
        return R.concat(offers, price.offers);
      }, prevPrice) : price;
    }, acc);
  }, {}, prices);
};

var simplifyPrices = function simplifyPrices(prices) {
  return R.map(R.over(R.lensProp('offers'), R.map(R.prop('id'))), prices);
};

var generateNextPrices = function generateNextPrices(prices, offersHub, currency) {
  return R.call(R.pipe(convertPricesListToMap, R.toPairs, R.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        price = _ref4[1];

    return R.over(R.lensProp('offers'), sortOffers(offersHub, currency), price);
  }), sortPrices(currency), simplifyPrices, R.take(_constants.COUNT_AT_PAGE)), prices);
};

exports.generateNextPrices = generateNextPrices;

var getHotelsEntitiesMap = function getHotelsEntitiesMap(prices, hotelsHub, hotelsFromStore) {
  return R.call(R.pipe(R.filter(function (_ref5) {
    var hotelID = _ref5.hotelID;
    return !hotelsFromStore[hotelID];
  }), R.map(function (_ref6) {
    var hotelID = _ref6.hotelID;
    return [hotelID, hotelsHub[hotelID]];
  }), R.fromPairs), prices);
};

exports.getHotelsEntitiesMap = getHotelsEntitiesMap;

var getOffersEntitiesMap = function getOffersEntitiesMap(prices, offersHub) {
  return R.call(R.pipe(R.map(R.prop('offers')), R.flatten, R.map(function (offerID) {
    return [offerID, offersHub[offerID]];
  }), R.fromPairs), prices);
};

exports.getOffersEntitiesMap = getOffersEntitiesMap;

var getUnusedPrices = function getUnusedPrices(nextPrices, unusedPrices) {
  return R.call(R.pipe(getHotelsIDsFromPrices, function (usedHotels) {
    return R.filter(function (_ref7) {
      var hotelID = _ref7.hotelID;
      return !R.includes(hotelID, usedHotels);
    }, unusedPrices);
  }), nextPrices);
};

exports.getUnusedPrices = getUnusedPrices;