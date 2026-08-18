import * as R from 'ramda';
import { SORT_BY_PRICE } from '../../../../queries/constants';
import { COUNT_AT_PAGE } from './constants';
export const getIgnoreOperators = operators => R.call(R.pipe(R.toPairs, R.filter(_ref => {
  let [, isReady] = _ref;
  return isReady;
}), R.map(R.head)), operators);
const stringifyOperators = operators => R.join(',', operators);
export const addIgnoreOperators = (query, ignoreOperators) => R.call(R.pipe(stringifyOperators, stringifyIgnoreOperators => query.ignoreOperators = query.ignoreOperators ? R.concat(`${query.ignoreOperators},`, stringifyIgnoreOperators) : stringifyIgnoreOperators), ignoreOperators);
export const getHotelsIDsFromPrices = prices => R.map(R.prop('hotelID'), prices);
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
export const generateNextPrices = function (prices, offersHub, currency, sortBy, hotelsHub) {
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
  })), sortBy === SORT_BY_PRICE ? sortPrices(currency) : sortPricesByRatings(hotelsHub), simplifyPrices, R.take(COUNT_AT_PAGE)), prices);
};
export const getHotelsEntitiesMap = (prices, hotelsHub, hotelsFromStore) => R.call(R.pipe(R.filter(_ref8 => {
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
export const getOffersEntitiesMap = (prices, offersHub) => R.call(R.pipe(R.map(R.prop('offers')), R.flatten, R.map(offerID => [offerID, offersHub[offerID]]), R.fromPairs), prices);
export const getUnusedPrices = (nextPrices, unusedPrices) => R.call(R.pipe(getHotelsIDsFromPrices, usedHotels => R.filter(_ref10 => {
  let {
    hotelID
  } = _ref10;
  return !R.includes(hotelID, usedHotels);
}, unusedPrices)), nextPrices);
export const getTotalBySelectedOperators = _ref11 => {
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