"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnusedPrices = exports.getOffersEntitiesMap = exports.getIgnoreOperators = exports.getHotelsIDsFromPrices = exports.getHotelsEntitiesMap = exports.generateNextPrices = exports.addIgnoreOperators = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _constants = require("./constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
<<<<<<< HEAD
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
=======
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
>>>>>>> task-45948
var getIgnoreOperators = exports.getIgnoreOperators = function getIgnoreOperators(operators) {
  return R.call(R.pipe(R.toPairs, R.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      isReady = _ref2[1];
    return isReady;
  }), R.map(R.head)), operators);
};
var stringifyOperators = function stringifyOperators(operators) {
  return R.join(',', operators);
};
var addIgnoreOperators = exports.addIgnoreOperators = function addIgnoreOperators(query, ignoreOperators) {
  return R.call(R.pipe(stringifyOperators, function (stringifyIgnoreOperators) {
    return query.ignoreOperators = query.ignoreOperators ? R.concat("".concat(query.ignoreOperators, ","), stringifyIgnoreOperators) : stringifyIgnoreOperators;
  }), ignoreOperators);
};
var getHotelsIDsFromPrices = exports.getHotelsIDsFromPrices = function getHotelsIDsFromPrices(prices) {
  return R.map(R.prop('hotelID'), prices);
};
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
var generateNextPrices = exports.generateNextPrices = function generateNextPrices(prices, offersHub, currency) {
  return R.call(R.pipe(convertPricesListToMap, R.toPairs, R.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      price = _ref4[1];
    return R.over(R.lensProp('offers'), sortOffers(offersHub, currency), price);
  }), sortPrices(currency), simplifyPrices, R.take(_constants.COUNT_AT_PAGE)), prices);
};
var getHotelsEntitiesMap = exports.getHotelsEntitiesMap = function getHotelsEntitiesMap(prices, hotelsHub, hotelsFromStore) {
  return R.call(R.pipe(R.filter(function (_ref5) {
    var hotelID = _ref5.hotelID;
    return !hotelsFromStore[hotelID];
  }), R.map(function (_ref6) {
    var hotelID = _ref6.hotelID;
    return [hotelID, hotelsHub[hotelID]];
  }), R.fromPairs), prices);
};
var getOffersEntitiesMap = exports.getOffersEntitiesMap = function getOffersEntitiesMap(prices, offersHub) {
  return R.call(R.pipe(R.map(R.prop('offers')), R.flatten, R.map(function (offerID) {
    return [offerID, offersHub[offerID]];
  }), R.fromPairs), prices);
};
var getUnusedPrices = exports.getUnusedPrices = function getUnusedPrices(nextPrices, unusedPrices) {
  return R.call(R.pipe(getHotelsIDsFromPrices, function (usedHotels) {
    return R.filter(function (_ref7) {
      var hotelID = _ref7.hotelID;
      return !R.includes(hotelID, usedHotels);
    }, unusedPrices);
  }), nextPrices);
};