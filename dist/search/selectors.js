"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectOperators = exports.offersByKey = exports.isStart = exports.isSetSearch = exports.isSetHotelAtPrices = exports.isSearch = exports.isProccess = exports.isFail = exports.isDone = exports.hotelsByKey = exports.getTotal = exports.getSearchProgressByPercent = exports.getSearchCountry = exports.getPricesWithEntities = exports.getPrices = exports.getOperatorsWithMinPrice = exports.getOperatorsByHotelID = exports.getOperatorLink = exports.getOffersFromPrices = exports.getNightsWithMinPrice = exports.getHotelsTotal = exports.getHotelsMarkers = exports.getHotelsByMultipleSearch = exports.getHotelsByMinPrice = exports.getFoodsWithMinPrice = exports.getFlattenPrices = exports.getError = exports.getChart = exports.getCenterByHotelsMarkers = exports.getCategoryWithMinPrice = exports.getBoundsByHotelsMarkers = exports.getAvailableDates = exports.createGetDeparturesWithMinPrice = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
var _static = require("@otpusk/json-api/dist/static");
var _geolib = require("geolib");
var _selectors = require("./../offers/selectors");
var _selectors2 = require("./../hotels/selectors");
var _selectors3 = require("./../queries/selectors");
var _selectors4 = require("./../geo/selectors");
var _fn = require("./../queries/fn");
var _resultsMemory = require("./saga/workers/getResultsWorker/resultsMemory");
var _helpers = require("./helpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const domain = _ => _.search;
const getQueryID = (_, _ref) => {
  let {
    queryID
  } = _ref;
  return queryID;
};
const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];
const getOffersListFromSearchMemory = queryID => R.prop(queryID, _resultsMemory.memoryInstances) ? R.call(R.pipe(memory => memory.getValues(), R.prop('offersHub'), R.toPairs, R.map(_ref2 => {
  let [, offer] = _ref2;
  return offer;
})), _resultsMemory.memoryInstances[queryID]) : [];
const getUnusedPricesFromSearchMemory = queryID => R.call(R.ifElse(Boolean, memory => memory.getValues().unusedPrices, R.always([])), _resultsMemory.memoryInstances[queryID]);
const getUnusedHotelsFromSearchMemory = queryID => R.call(R.pipe(getUnusedPricesFromSearchMemory, R.map(R.prop('hotelID'))), queryID);
const getResults = (0, _reselect.createSelector)(domain, search => search.get('results'));
const searchByKey = (0, _reselect.createSelector)(getResults, getQueryID, (results, key) => results.get(key) ? results.get(key).toObject() : EMPTY_OBJ);
const getSearchCountry = exports.getSearchCountry = (0, _reselect.createSelector)(searchByKey, R.propOr(EMPTY_OBJ, 'country'));
const getTotal = exports.getTotal = (0, _reselect.createSelector)(searchByKey, R.propOr(0, 'total'));
const isSetSearch = exports.isSetSearch = (0, _reselect.createSelector)(searchByKey, search => !R.isEmpty(search));
const getHotelsByPages = () => (0, _reselect.createSelector)(searchByKey, R.pipe(R.prop('hotels'), R.values));
const getHotelsByMinPrice = () => (0, _reselect.createSelector)(getHotelsByPages(), (0, _selectors.getOffers)(), _selectors3.getQuery, (pages, offersMap, query) => R.map(hotelsMap => R.call(R.pipe(R.toPairs, R.map(_ref3 => {
  let [hotelID, offersIDs] = _ref3;
  return {
    hotelID,
    offersIDs: R.call(R.pipe(R.map(id => offersMap[id]), (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY))), offersIDs)
  };
}), _helpers.sortHotelsByMinOffer), hotelsMap), pages));
exports.getHotelsByMinPrice = getHotelsByMinPrice;
const hotelsByKey = () => (0, _reselect.createSelector)(getHotelsByPages(), R.reduce(R.mergeRight, {}));
exports.hotelsByKey = hotelsByKey;
const offersByKey = () => (0, _reselect.createSelector)(hotelsByKey(), (0, _selectors.getOffers)(), (hotels, offers) => R.pipe(R.values, R.flatten, R.map(offerID => R.prop(offerID, offers)), R.filter(Boolean))(hotels));
exports.offersByKey = offersByKey;
const selectOperators = () => (0, _reselect.createSelector)(searchByKey, _ref4 => {
  let {
    operators
  } = _ref4;
  return operators;
});
exports.selectOperators = selectOperators;
const getSearchProgressByPercent = exports.getSearchProgressByPercent = (0, _reselect.createSelector)(selectOperators(), operators => R.call(R.pipe(R.values, R.filter(Boolean), R.length, doneOperatorsCount => doneOperatorsCount * 100 / R.keys(operators).length, R.when(count => !count, R.always(0))), operators));
const getPrices = exports.getPrices = (0, _reselect.createSelector)(searchByKey, R.prop('prices'));
const getFlattenPrices = () => (0, _reselect.createSelector)(getPrices, prices => prices ? R.flatten(prices) : EMPTY_ARRAY);
exports.getFlattenPrices = getFlattenPrices;
const getOffersFromPrices = () => (0, _reselect.createSelector)(getPrices, (0, _selectors.getOffers)(), (pricesByPages, hub) => pricesByPages ? R.call(R.pipe(R.map(page => R.map(price => price.offers, page)), R.flatten, R.map(offerID => hub[offerID])), pricesByPages) : EMPTY_ARRAY);
exports.getOffersFromPrices = getOffersFromPrices;
const getPricesWithEntities = () => (0, _reselect.createSelector)(getFlattenPrices(), _selectors2.hotelsHub, (0, _selectors.getOffers)(), (prices, hotels, offers) => R.map(_ref5 => {
  let {
    hotelID,
    offers: ids
  } = _ref5;
  return R.mergeAll([{
    hotel: hotels[hotelID]
  }, {
    offers: R.map(id => offers[id], ids)
  }]);
}, prices));
exports.getPricesWithEntities = getPricesWithEntities;
const isSetHotelAtPrices = () => (0, _reselect.createSelector)(getFlattenPrices(), (_, _ref6) => {
  let {
    hotelID
  } = _ref6;
  return hotelID;
}, (prices, hotelID) => R.any(R.propEq(hotelID, 'hotelID'), prices));
exports.isSetHotelAtPrices = isSetHotelAtPrices;
const getError = () => (0, _reselect.createSelector)(searchByKey, R.prop('error'));
exports.getError = getError;
const isStart = exports.isStart = (0, _reselect.createSelector)(searchByKey, _ref7 => {
  let {
    status
  } = _ref7;
  return status === 'starting';
});
const isDone = exports.isDone = (0, _reselect.createSelector)(searchByKey, _ref8 => {
  let {
    status
  } = _ref8;
  return status === 'done';
});
const isSearch = exports.isSearch = (0, _reselect.createSelector)(searchByKey, _ref9 => {
  let {
    status
  } = _ref9;
  return status === 'processing';
});
const isFail = exports.isFail = (0, _reselect.createSelector)(searchByKey, _ref10 => {
  let {
    status
  } = _ref10;
  return status === 'failed';
});
const isProccess = exports.isProccess = (0, _reselect.createSelector)(isStart, isSearch, R.or);
const getOperatorsWithMinPrice = () => (0, _reselect.createSelector)(selectOperators(), getOffersFromPrices(), getQueryID, _selectors3.getQuery, (operatorsObject, offers, queryID, query) => operatorsObject ? R.call(R.pipe(R.toPairs, R.map(_ref11 => {
  let [id, isReady] = _ref11;
  return {
    id: Number(id),
    isReady,
    offer: R.call(R.pipe(R.filter(_ref12 => {
      let {
        operator
      } = _ref12;
      return operator === Number(id);
    }), (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head), R.concat(offers, getOffersListFromSearchMemory(queryID)))
  };
}), R.sort(R.ascend(R.pathOr(Infinity, ['offer', 'price', query.get(_fn.QUERY_PARAMS.CURRENCY)]))), R.map(_ref13 => {
  let {
    offer,
    ...entity
  } = _ref13;
  return R.mergeAll([entity, {
    offerID: R.prop('id', offer)
  }]);
})), operatorsObject) : EMPTY_ARRAY);
exports.getOperatorsWithMinPrice = getOperatorsWithMinPrice;
const getFoodsWithMinPrice = () => (0, _reselect.createSelector)(getOffersFromPrices(), getQueryID, _selectors3.getQuery, (offers, queryID, query) => {
  const groupedByFood = R.groupBy(R.prop('food'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
  return R.map(_ref14 => {
    let {
      code
    } = _ref14;
    return {
      code,
      offerID: R.prop(code, groupedByFood) ? R.call(R.pipe(R.prop(code), (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), groupedByFood) : undefined
    };
  }, _static.FOODS);
});
exports.getFoodsWithMinPrice = getFoodsWithMinPrice;
const getCategoryWithMinPrice = () => (0, _reselect.createSelector)(getPricesWithEntities(), _selectors3.getQuery, (prices, query) => {
  const categoriesAsArray = query ? R.map(R.head, R.toPairs(query.get(_fn.QUERY_PARAMS.CATEGORY).toObject())) : EMPTY_ARRAY;
  const groupedByCaregory = R.groupBy(R.path(['hotel', 'stars']), prices);
  return R.map(category => ({
    category,
    ...R.call(R.ifElse(Boolean, R.pipe(R.map(R.prop('offers')), R.flatten, (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head, _ref15 => {
      let {
        id,
        hotelId
      } = _ref15;
      return {
        offerID: id,
        hotelID: hotelId
      };
    }), R.always({
      offerID: undefined,
      hotelID: undefined
    })), R.prop(category, groupedByCaregory))
  }), categoriesAsArray);
});
exports.getCategoryWithMinPrice = getCategoryWithMinPrice;
const getNightsWithMinPrice = () => (0, _reselect.createSelector)(_selectors3.getQueryParam, getOffersFromPrices(), getQueryID, _selectors3.getQuery, (durationByNights, offers, queryID, query) => {
  const groupedByNights = R.groupBy(R.prop('nights'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
  if (R.isEmpty(groupedByNights)) {
    return EMPTY_ARRAY;
  }
  const nights = R.range(durationByNights.get('from'), R.inc(durationByNights.get('to')));
  return R.map(night => ({
    night,
    offerID: R.prop(night, groupedByNights) ? R.call(R.pipe(R.prop(night), (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), groupedByNights) : undefined
  }), nights);
});
exports.getNightsWithMinPrice = getNightsWithMinPrice;
const createGetDeparturesWithMinPrice = () => (0, _reselect.createSelector)((0, _selectors4.getDepartures)(), getOffersFromPrices(), getQueryID, _selectors3.getQuery, (departures, offers, queryID, query) => {
  const departuresIDsFromQuery = query ? query.get(_fn.QUERY_PARAMS.DEPARTURES).toArray() : EMPTY_ARRAY;
  const groupedByDeparture = R.groupBy(R.prop('departure'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
  const departuresAsMap = R.indexBy(R.prop('id'), departures);
  return R.map(id => R.mergeAll([departuresAsMap[id], {
    offerID: R.call(R.ifElse(Boolean, R.pipe((0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), R.always(undefined)), groupedByDeparture[id]),
    queryID
  }]), departuresIDsFromQuery);
});
exports.createGetDeparturesWithMinPrice = createGetDeparturesWithMinPrice;
const getMeta = (0, _reselect.createSelector)(searchByKey, R.propOr(EMPTY_OBJ, 'meta'));
const getOperatorsLinks = (0, _reselect.createSelector)(getMeta, R.pathOr(EMPTY_OBJ, ['links', 'operators']));
const getOperatorLink = exports.getOperatorLink = (0, _reselect.createSelector)(getOperatorsLinks, (_, _ref16) => {
  let {
    operatorID
  } = _ref16;
  return operatorID;
}, (links, id) => R.prop(id, links));
const getHotels = () => (0, _reselect.createSelector)(getFlattenPrices(), getQueryID, (prices, queryID) => R.concat(R.map(R.prop('hotelID'), prices), getUnusedHotelsFromSearchMemory(queryID)));
const getHotelsByMultipleSearch = queryIDs => {
  const selectors = R.map(queryID => R.partialRight(getHotels(), [{
    queryID
  }]), queryIDs);
  return (0, _reselect.createSelector)(selectors, function () {
    for (var _len = arguments.length, results = new Array(_len), _key = 0; _key < _len; _key++) {
      results[_key] = arguments[_key];
    }
    return R.pipe(R.flatten, R.uniq, R.length)(results);
  });
};
exports.getHotelsByMultipleSearch = getHotelsByMultipleSearch;
const getHotelsTotal = () => (0, _reselect.createSelector)(getHotels(), R.length);
exports.getHotelsTotal = getHotelsTotal;
const getOperatorsByHotelID = () => (0, _reselect.createSelector)(getFlattenPrices(), (0, _selectors.getOffers)(), (0, _selectors4.getOperatorsMap)(), (_, _ref17) => {
  let {
    hotelID
  } = _ref17;
  return hotelID;
}, (prices, offersHub, operatorsMap, hotelID) => R.isEmpty(prices) ? EMPTY_ARRAY : R.call(R.pipe(R.find(R.propEq(hotelID, 'hotelID')), R.propOr(EMPTY_ARRAY, 'offers'), R.map(id => offersHub[id].operator), R.uniq, R.map(id => operatorsMap[id])), prices));
exports.getOperatorsByHotelID = getOperatorsByHotelID;
const getCharts = (0, _reselect.createSelector)(domain, search => search.get('charts'));
const getChart = exports.getChart = (0, _reselect.createSelector)(getCharts, getQueryID, (charts, queryID) => charts.get(queryID, EMPTY_ARRAY));
const getHotelsMarkers = () => (0, _reselect.createSelector)(getPricesWithEntities(), prices => R.filter(Boolean, R.map(R.pipe(_ref18 => {
  let {
    hotel,
    offers: [offer]
  } = _ref18;
  return R.mergeAll([hotel, {
    offerID: R.prop('id', offer)
  }]);
}, R.ifElse(R.prop('location'), _ref19 => {
  let {
    id,
    location,
    offerID,
    stars
  } = _ref19;
  return {
    hotelID: id,
    offerID,
    position: R.pick(['lat', 'lng'], location),
    stars,
    zoom: location.zoom
  };
}, R.always(null))), prices)));
exports.getHotelsMarkers = getHotelsMarkers;
const getCenterByHotelsMarkers = () => (0, _reselect.createSelector)(getHotelsMarkers(), markers => !R.isEmpty(markers) ? R.call(R.pipe(R.map(R.applySpec({
  latitude: R.path(['position', 'lat']),
  longitude: R.path(['position', 'lng'])
})), _geolib.getCenter, R.applySpec({
  lat: R.prop('latitude'),
  lng: R.prop('longitude')
})), markers) : undefined);
exports.getCenterByHotelsMarkers = getCenterByHotelsMarkers;
const getBoundsByHotelsMarkers = () => (0, _reselect.createSelector)(getHotelsMarkers(), markers => !R.isEmpty(markers) ? R.call(R.pipe(R.map(R.applySpec({
  latitude: R.path(['position', 'lat']),
  longitude: R.path(['position', 'lng'])
})), _geolib.getBounds, _ref20 => {
  let {
    minLat,
    maxLat,
    minLng,
    maxLng
  } = _ref20;
  return {
    ne: {
      lat: maxLat,
      lng: maxLng
    },
    sw: {
      lat: minLat,
      lng: minLng
    }
  };
}), markers) : undefined);
exports.getBoundsByHotelsMarkers = getBoundsByHotelsMarkers;
const getAvailableDates = exports.getAvailableDates = R.useWith((availableDates, key) => R.propOr(EMPTY_ARRAY, key, availableDates), [R.pipe(domain, search => search.get('availableDates')), R.prop('key')]);