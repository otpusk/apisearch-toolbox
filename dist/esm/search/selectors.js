import { createSelector } from 'reselect';
import * as R from 'ramda';
import { FOODS } from '@otpusk/json-api/dist/static';
import { getBounds, getCenter } from 'geolib';
import { getOffers } from './../offers/selectors';
import { hotelsHub } from './../hotels/selectors';
import { getQueryParam } from './../queries/selectors';
import { getDepartures, getOperatorsMap } from './../geo/selectors';
import { getQuery } from './../queries/selectors';
import { QUERY_PARAMS } from './../queries/fn';
import { memoryInstances } from './saga/workers/getResultsWorker/resultsMemory';
import { sortOffersByMinPrice, sortHotelsByMinOffer } from './helpers';
const domain = _ => _.search;
const getQueryID = (_, _ref) => {
  let {
    queryID
  } = _ref;
  return queryID;
};
const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];
const getOffersListFromSearchMemory = queryID => R.prop(queryID, memoryInstances) ? R.call(R.pipe(memory => memory.getValues(), R.prop('offersHub'), R.toPairs, R.map(_ref2 => {
  let [, offer] = _ref2;
  return offer;
})), memoryInstances[queryID]) : [];
const getUnusedPricesFromSearchMemory = queryID => R.call(R.ifElse(Boolean, memory => memory.getValues().unusedPrices, R.always([])), memoryInstances[queryID]);
const getUnusedHotelsFromSearchMemory = queryID => R.call(R.pipe(getUnusedPricesFromSearchMemory, R.map(R.prop('hotelID'))), queryID);
const getResults = createSelector(domain, search => search.get('results'));
const searchByKey = createSelector(getResults, getQueryID, (results, key) => results.get(key) ? results.get(key).toObject() : EMPTY_OBJ);
export const getSearchCountry = createSelector(searchByKey, R.propOr(EMPTY_OBJ, 'country'));
export const getTotal = createSelector(searchByKey, R.propOr(0, 'total'));
export const isSetSearch = createSelector(searchByKey, search => !R.isEmpty(search));
const getHotelsByPages = () => createSelector(searchByKey, R.pipe(R.prop('hotels'), R.values));
export const getHotelsByMinPrice = () => createSelector(getHotelsByPages(), getOffers(), getQuery, (pages, offersMap, query) => R.map(hotelsMap => R.call(R.pipe(R.toPairs, R.map(_ref3 => {
  let [hotelID, offersIDs] = _ref3;
  return {
    hotelID,
    offersIDs: R.call(R.pipe(R.map(id => offersMap[id]), sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY))), offersIDs)
  };
}), sortHotelsByMinOffer), hotelsMap), pages));
export const hotelsByKey = () => createSelector(getHotelsByPages(), R.reduce(R.mergeRight, {}));
export const offersByKey = () => createSelector(hotelsByKey(), getOffers(), (hotels, offers) => R.pipe(R.values, R.flatten, R.map(offerID => R.prop(offerID, offers)), R.filter(Boolean))(hotels));
export const selectOperators = () => createSelector(searchByKey, _ref4 => {
  let {
    operators
  } = _ref4;
  return operators;
});
export const getSearchProgressByPercent = createSelector(selectOperators(), operators => R.call(R.pipe(R.values, R.filter(Boolean), R.length, doneOperatorsCount => doneOperatorsCount * 100 / R.keys(operators).length, R.when(count => !count, R.always(0))), operators));
export const getPrices = createSelector(searchByKey, R.prop('prices'));
export const getFlattenPrices = () => createSelector(getPrices, prices => prices ? R.flatten(prices) : EMPTY_ARRAY);
export const getOffersFromPrices = () => createSelector(getPrices, getOffers(), (pricesByPages, hub) => pricesByPages ? R.call(R.pipe(R.map(page => R.map(price => price.offers, page)), R.flatten, R.map(offerID => hub[offerID])), pricesByPages) : EMPTY_ARRAY);
export const getPricesWithEntities = () => createSelector(getFlattenPrices(), hotelsHub, getOffers(), (prices, hotels, offers) => R.map(_ref5 => {
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
export const isSetHotelAtPrices = () => createSelector(getFlattenPrices(), (_, _ref6) => {
  let {
    hotelID
  } = _ref6;
  return hotelID;
}, (prices, hotelID) => R.any(R.propEq(hotelID, 'hotelID'), prices));
export const getError = () => createSelector(searchByKey, R.prop('error'));
export const isStart = createSelector(searchByKey, _ref7 => {
  let {
    status
  } = _ref7;
  return status === 'starting';
});
export const isDone = createSelector(searchByKey, _ref8 => {
  let {
    status
  } = _ref8;
  return status === 'done';
});
export const isSearch = createSelector(searchByKey, _ref9 => {
  let {
    status
  } = _ref9;
  return status === 'processing';
});
export const isFail = createSelector(searchByKey, _ref10 => {
  let {
    status
  } = _ref10;
  return status === 'failed';
});
export const isProccess = createSelector(isStart, isSearch, R.or);
export const getOperatorsWithMinPrice = () => createSelector(selectOperators(), getOffersFromPrices(), getQueryID, getQuery, (operatorsObject, offers, queryID, query) => operatorsObject ? R.call(R.pipe(R.toPairs, R.map(_ref11 => {
  let [id, isReady] = _ref11;
  return {
    id: Number(id),
    isReady,
    offer: R.call(R.pipe(R.filter(_ref12 => {
      let {
        operator
      } = _ref12;
      return operator === Number(id);
    }), sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)), R.head), R.concat(offers, getOffersListFromSearchMemory(queryID)))
  };
}), R.sort(R.ascend(R.pathOr(Infinity, ['offer', 'price', query.get(QUERY_PARAMS.CURRENCY)]))), R.map(_ref13 => {
  let {
    offer,
    ...entity
  } = _ref13;
  return R.mergeAll([entity, {
    offerID: R.prop('id', offer)
  }]);
})), operatorsObject) : EMPTY_ARRAY);
export const getFoodsWithMinPrice = () => createSelector(getOffersFromPrices(), getQueryID, getQuery, (offers, queryID, query) => {
  const groupedByFood = R.groupBy(R.prop('food'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
  return R.map(_ref14 => {
    let {
      code
    } = _ref14;
    return {
      code,
      offerID: R.prop(code, groupedByFood) ? R.call(R.pipe(R.prop(code), sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), groupedByFood) : undefined
    };
  }, FOODS);
});
export const getCategoryWithMinPrice = () => createSelector(getPricesWithEntities(), getQuery, (prices, query) => {
  const categoriesAsArray = query ? R.map(R.head, R.toPairs(query.get(QUERY_PARAMS.CATEGORY).toObject())) : EMPTY_ARRAY;
  const groupedByCaregory = R.groupBy(R.path(['hotel', 'stars']), prices);
  return R.map(category => ({
    category,
    ...R.call(R.ifElse(Boolean, R.pipe(R.map(R.prop('offers')), R.flatten, sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)), R.head, _ref15 => {
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
export const getNightsWithMinPrice = () => createSelector(getQueryParam, getOffersFromPrices(), getQueryID, getQuery, (durationByNights, offers, queryID, query) => {
  const groupedByNights = R.groupBy(R.prop('nights'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
  if (R.isEmpty(groupedByNights)) {
    return EMPTY_ARRAY;
  }
  const nights = R.range(durationByNights.get('from'), R.inc(durationByNights.get('to')));
  return R.map(night => ({
    night,
    offerID: R.prop(night, groupedByNights) ? R.call(R.pipe(R.prop(night), sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), groupedByNights) : undefined
  }), nights);
});
export const createGetDeparturesWithMinPrice = () => createSelector(getDepartures(), getOffersFromPrices(), getQueryID, getQuery, (departures, offers, queryID, query) => {
  const departuresIDsFromQuery = query ? query.get(QUERY_PARAMS.DEPARTURES).toArray() : EMPTY_ARRAY;
  const groupedByDeparture = R.groupBy(R.prop('departure'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
  const departuresAsMap = R.indexBy(R.prop('id'), departures);
  return R.map(id => R.mergeAll([departuresAsMap[id], {
    offerID: R.call(R.ifElse(Boolean, R.pipe(sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), R.always(undefined)), groupedByDeparture[id]),
    queryID
  }]), departuresIDsFromQuery);
});
const getMeta = createSelector(searchByKey, R.propOr(EMPTY_OBJ, 'meta'));
const getOperatorsLinks = createSelector(getMeta, R.pathOr(EMPTY_OBJ, ['links', 'operators']));
export const getOperatorLink = createSelector(getOperatorsLinks, (_, _ref16) => {
  let {
    operatorID
  } = _ref16;
  return operatorID;
}, (links, id) => R.prop(id, links));
const getHotels = () => createSelector(getFlattenPrices(), getQueryID, (prices, queryID) => R.concat(R.map(R.prop('hotelID'), prices), getUnusedHotelsFromSearchMemory(queryID)));
export const getHotelsByMultipleSearch = queryIDs => {
  const selectors = R.map(queryID => R.partialRight(getHotels(), [{
    queryID
  }]), queryIDs);
  return createSelector(selectors, function () {
    for (var _len = arguments.length, results = new Array(_len), _key = 0; _key < _len; _key++) {
      results[_key] = arguments[_key];
    }
    return R.pipe(R.flatten, R.uniq, R.length)(results);
  });
};
export const getHotelsTotal = () => createSelector(getHotels(), R.length);
export const getOperatorsByHotelID = () => createSelector(getFlattenPrices(), getOffers(), getOperatorsMap(), (_, _ref17) => {
  let {
    hotelID
  } = _ref17;
  return hotelID;
}, (prices, offersHub, operatorsMap, hotelID) => R.isEmpty(prices) ? EMPTY_ARRAY : R.call(R.pipe(R.find(R.propEq(hotelID, 'hotelID')), R.propOr(EMPTY_ARRAY, 'offers'), R.map(id => offersHub[id].operator), R.uniq, R.map(id => operatorsMap[id])), prices));
const getCharts = createSelector(domain, search => search.get('charts'));
export const getChart = createSelector(getCharts, getQueryID, (charts, queryID) => charts.get(queryID, EMPTY_ARRAY));
export const getHotelsMarkers = () => createSelector(getPricesWithEntities(), prices => R.filter(Boolean, R.map(R.pipe(_ref18 => {
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
export const getCenterByHotelsMarkers = () => createSelector(getHotelsMarkers(), markers => !R.isEmpty(markers) ? R.call(R.pipe(R.map(R.applySpec({
  latitude: R.path(['position', 'lat']),
  longitude: R.path(['position', 'lng'])
})), getCenter, R.applySpec({
  lat: R.prop('latitude'),
  lng: R.prop('longitude')
})), markers) : undefined);
export const getBoundsByHotelsMarkers = () => createSelector(getHotelsMarkers(), markers => !R.isEmpty(markers) ? R.call(R.pipe(R.map(R.applySpec({
  latitude: R.path(['position', 'lat']),
  longitude: R.path(['position', 'lng'])
})), getBounds, _ref20 => {
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
export const getAvailableDates = R.useWith((availableDates, key) => R.propOr(EMPTY_ARRAY, key, availableDates), [R.pipe(domain, search => search.get('availableDates')), R.prop('key')]);