"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnusedPrices = exports.getTotalBySelectedOperators = exports.getOffersEntitiesMap = exports.getIgnoreOperators = exports.getHotelsIDsFromPrices = exports.getHotelsEntitiesMap = exports.generateNextPrices = exports.addIgnoreOperators = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _constants = require("../../../../queries/constants");
var _constants2 = require("./constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const getIgnoreOperators = operators => R.call(R.pipe(R.toPairs, R.filter(_ref => {
  let [, isReady] = _ref;
  return isReady;
}), R.map(R.head)), operators);
exports.getIgnoreOperators = getIgnoreOperators;
const stringifyOperators = operators => R.join(',', operators);
const addIgnoreOperators = (query, ignoreOperators) => R.call(R.pipe(stringifyOperators, stringifyIgnoreOperators => query.ignoreOperators = query.ignoreOperators ? R.concat(`${query.ignoreOperators},`, stringifyIgnoreOperators) : stringifyIgnoreOperators), ignoreOperators);
exports.addIgnoreOperators = addIgnoreOperators;
const getHotelsIDsFromPrices = prices => R.map(R.prop('hotelID'), prices);
exports.getHotelsIDsFromPrices = getHotelsIDsFromPrices;
const sortOffers = (offersHub, currency) => offers => R.call(R.pipe(R.map(offerID => offersHub[offerID]), R.sort(R.ascend(R.path(['price', currency])))), offers);
const sortPrices = currency => prices => R.sort(R.ascend(R.path(['offers', 0, 'price', currency])), prices);
const sortByReviews = (ratingsA, ratingsB) => R.descend(R.reduce((acc, _ref2) => {
  let {
    reviews
  } = _ref2;
  return R.add(acc, reviews);
}, 0), ratingsA, ratingsB);
const sortPricesByRatings = hotelsHub => prices => R.sort((_ref3, _ref4) => {
  let {
    hotelID: idA
  } = _ref3;
  let {
    hotelID: idB
  } = _ref4;
  const {
    averageRating: averageRatingA,
    sourceRatings: ratingsA
  } = hotelsHub[idA];
  const {
    averageRating: averageRatingB,
    sourceRatings: ratingsB
  } = hotelsHub[idB];
  return averageRatingA === averageRatingB ? sortByReviews(ratingsA, ratingsB) : averageRatingB - averageRatingA;
}, prices);
const convertPricesListToMap = prices => R.reduce((acc, price) => R.over(R.lensProp(price.hotelID), prevPrice => prevPrice ? R.over(R.lensProp('offers'), offers => R.concat(offers, price.offers), prevPrice) : price, acc), {}, prices);
const simplifyPrices = prices => R.map(R.over(R.lensProp('offers'), R.map(R.prop('id'))), prices);
const generateNextPrices = function (prices, offersHub, currency, sortBy, hotelsHub) {
  let selectedOperators = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  return R.call(R.pipe(convertPricesListToMap, R.toPairs, R.map(_ref5 => {
    let [, price] = _ref5;
    return R.over(R.lensProp('offers'), sortOffers(offersHub, currency), price);
  }), R.when(() => !R.isEmpty(selectedOperators), R.filter(_ref6 => {
    let {
      offers
    } = _ref6;
    return offers.some(_ref7 => {
      let {
        operator
      } = _ref7;
      return R.includes(operator, selectedOperators);
    });
  })), sortBy === _constants.SORT_BY_PRICE ? sortPrices(currency) : sortPricesByRatings(hotelsHub), simplifyPrices, R.take(_constants2.COUNT_AT_PAGE)), prices);
};
exports.generateNextPrices = generateNextPrices;
const getHotelsEntitiesMap = (prices, hotelsHub, hotelsFromStore) => R.call(R.pipe(R.filter(_ref8 => {
  let {
    hotelID
  } = _ref8;
  return !hotelsFromStore[hotelID];
}), R.map(_ref9 => {
  let {
    hotelID
  } = _ref9;
  return [hotelID, hotelsHub[hotelID]];
}), R.fromPairs), prices);
exports.getHotelsEntitiesMap = getHotelsEntitiesMap;
const getOffersEntitiesMap = (prices, offersHub) => R.call(R.pipe(R.map(R.prop('offers')), R.flatten, R.map(offerID => [offerID, offersHub[offerID]]), R.fromPairs), prices);
exports.getOffersEntitiesMap = getOffersEntitiesMap;
const getUnusedPrices = (nextPrices, unusedPrices) => R.call(R.pipe(getHotelsIDsFromPrices, usedHotels => R.filter(_ref10 => {
  let {
    hotelID
  } = _ref10;
  return !R.includes(hotelID, usedHotels);
}, unusedPrices)), nextPrices);
exports.getUnusedPrices = getUnusedPrices;
const getTotalBySelectedOperators = _ref11 => {
  let {
    offersHub,
    prices,
    selectedOperators
  } = _ref11;
  const selectedOperatorsSet = new Set(selectedOperators);
  return R.pipe(R.when(() => selectedOperatorsSet.size, R.pipe(convertPricesListToMap, R.values, R.map(R.over(R.lensProp('offers'), R.filter(offerID => selectedOperatorsSet.has(offersHub[offerID].operator)))), R.filter(_ref12 => {
    let {
      offers
    } = _ref12;
    return !R.isEmpty(offers);
  }))), R.length)(prices);
};
exports.getTotalBySelectedOperators = getTotalBySelectedOperators;