import { createSelector } from 'reselect';
import * as R from 'ramda';
import { FOODS } from '@otpusk/json-api/dist/static';
import { getCenter } from 'geolib';

import { getOffers } from './../offers/selectors';
import { hotelsHub } from './../hotels/selectors';
import { getQueryParam } from './../queries/selectors';
import { getOperatorsMap } from './../geo/selectors';
import { getQuery } from './../queries/selectors';
import { QUERY_PARAMS } from './../queries/fn';

import { memoryInstances } from './saga/workers/getResultsWorker/resultsMemory';
import { sortOffersByMinPrice, sortHotelsByMinOffer } from './helpers';

const domain = (_) => _.search;
const getQueryID = (_, { queryID }) => queryID;

const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];

const getOffersListFromSearchMemory = (queryID) => R.prop(queryID, memoryInstances)
    ? R.call(
        R.pipe(
            (memory) => memory.getValues(),
            R.prop('offersHub'),
            R.toPairs,
            R.map(([, offer]) => offer)
        ),
        memoryInstances[queryID]
    )
    : [];
const getUnusedPricesFromSearchMemory = (queryID) => R.call(
    R.ifElse(
        Boolean,
        (memory) => memory.getValues().unusedPrices,
        R.always([])
    ),
    memoryInstances[queryID]
);
const getUnusedHotelsFromSearchMemory = (queryID) => R.call(
    R.pipe(
        getUnusedPricesFromSearchMemory,
        R.map(R.prop('hotelID'))
    ),
    queryID
);

const getResults = createSelector(
    domain,
    (search) => search.get('results')
);

const searchByKey = createSelector(
    getResults,
    getQueryID,
    (results, key) => results.get(key) ? results.get(key).toObject() : EMPTY_OBJ
);

export const getSearchCountry = createSelector(
    searchByKey,
    R.propOr(EMPTY_OBJ, 'country')
);

export const getTotal = createSelector(
    searchByKey,
    R.propOr(0, 'total')
);

export const isSetSearch = createSelector(
    searchByKey,
    (search) => !R.isEmpty(search)
);

const getHotelsByPages = () => createSelector(
    searchByKey,
    R.pipe(
        R.prop('hotels'),
        R.values
    )
);

export const getHotelsByMinPrice = () => createSelector(
    getHotelsByPages(),
    getOffers(),
    getQuery,
    (pages, offersMap, query) => R.map(
        (hotelsMap) => R.call(
            R.pipe(
                R.toPairs,
                R.map(([hotelID, offersIDs]) => ({
                    hotelID,
                    offersIDs: R.call(
                        R.pipe(
                            R.map((id) => offersMap[id]),
                            sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY))
                        ),
                        offersIDs
                    ),
                })),
                sortHotelsByMinOffer
            ),
            hotelsMap
        ),
        pages
    )
);

export const hotelsByKey = () => createSelector(
    getHotelsByPages(),
    R.reduce(R.mergeRight, {})
);

export const offersByKey = () => createSelector(
    hotelsByKey(),
    getOffers(),
    (hotels, offers) => R.pipe(
        R.values,
        R.flatten,
        R.map((offerID) => R.prop(offerID, offers)),
        R.filter(Boolean)
    )(hotels)
);

export const selectOperators = () => createSelector(
    searchByKey,
    ({ operators }) => operators
);

export const getSearchProgressByPercent = createSelector(
    selectOperators(),
    (operators) => R.call(
        R.pipe(
            R.values,
            R.filter(Boolean),
            R.length,
            (doneOperatorsCount) => doneOperatorsCount * 100 / R.keys(operators).length,
            R.when((count) => !count, R.always(0))
        ),
        operators
    )
);

export const getPrices = createSelector(
    searchByKey,
    R.prop('prices')
);

export const getFlattenPrices = () => createSelector(
    getPrices,
    (prices) => prices ? R.flatten(prices) : EMPTY_ARRAY
);

export const getOffersFromPrices = () => createSelector(
    getPrices,
    getOffers(),
    (pricesByPages, hub) => pricesByPages
        ? R.call(
            R.pipe(
                R.map((page) => R.map((price) => price.offers, page)),
                R.flatten,
                R.map((offerID) => hub[offerID])
            ),
            pricesByPages
        )
        : EMPTY_ARRAY
);

export const isSetHotelAtPrices = () => createSelector(
    getFlattenPrices(),
    (_, { hotelID }) => hotelID,
    (prices, hotelID) => R.any(
        R.propEq('hotelID', hotelID),
        prices
    )
);

export const getError = () => createSelector(
    searchByKey, R.prop('error')
);

export const isStart = createSelector(
    searchByKey,
    ({ status }) => status === 'starting'
);
export const isDone = createSelector(
    searchByKey,
    ({ status }) => status === 'done'
);
export const isSearch = createSelector(
    searchByKey,
    ({ status }) => status === 'processing'
);
export const isFail = createSelector(
    searchByKey,
    ({ status }) => status === 'failed'
);

export const isProccess = createSelector(
    isStart,
    isSearch,
    R.or
);

export const getOperatorsWithMinPrice = () => createSelector(
    selectOperators(),
    getOffersFromPrices(),
    getQueryID,
    getQuery,
    (operatorsObject, offers, queryID, query) => operatorsObject
        ? R.call(
            R.pipe(
                R.toPairs,
                R.map(
                    ([id, isReady]) => ({
                        id:    Number(id),
                        isReady,
                        offer: R.call(
                            R.pipe(
                                R.filter(({ operator }) => operator === Number(id)),
                                sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)),
                                R.head
                            ),
                            R.concat(
                                offers,
                                getOffersListFromSearchMemory(queryID)
                            )
                        ),
                    })
                ),
                R.sort(R.ascend(R.pathOr(Infinity, ['offer', 'price', query.get(QUERY_PARAMS.CURRENCY)]))),
                R.map(({ offer, ...entity }) => R.mergeAll([
                    entity,
                    { offerID: R.prop('id', offer) }
                ]))
            ),
            operatorsObject
        )
        : EMPTY_ARRAY
);

export const getFoodsWithMinPrice = () => createSelector(
    getOffersFromPrices(),
    getQueryID,
    getQuery,
    (offers, queryID, query) => {
        const groupedByFood = R.groupBy(R.prop('food'), R.concat(
            offers,
            getOffersListFromSearchMemory(queryID)
        ));

        return R.map(
            ({ code }) => ({
                code,
                offerID: R.prop(code, groupedByFood)
                    ? R.call(
                        R.pipe(
                            R.prop(code),
                            sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)),
                            R.head,
                            R.prop('id')
                        ),
                        groupedByFood
                    )
                    : undefined,
            }),
            FOODS
        );
    }
);

export const getCategoryWithMinPrice = () => createSelector(
    getQueryParam,
    getFlattenPrices(),
    hotelsHub,
    getOffers(),
    getQueryID,
    getQuery,
    // eslint-disable-next-line max-params
    (categoryMap, prices, hotels, offers, queryID, query) => {
        const groupedByCaregory = R.groupBy(
            R.path(['hotel', 'stars']),
            R.map(
                ({ hotelID, offers: ids }) => R.mergeAll([
                    { hotel: hotels[hotelID] },
                    { offers: R.map((id) => R.mergeAll([offers[id], { hotelID }]), ids) }
                ]),
                R.concat(
                    prices,
                    getUnusedPricesFromSearchMemory(queryID)
                )
            )
        );

        return R.isEmpty(groupedByCaregory)
            ? EMPTY_ARRAY
            : R.map(
                ([category]) => ({
                    category,
                    ...R.call(
                        R.ifElse(
                            Boolean,
                            R.pipe(
                                R.map(R.prop('offers')),
                                R.flatten,
                                sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)),
                                R.head,
                                ({ id, hotelID }) => ({ offerID: id, hotelID })
                            ),
                            R.always({})
                        ),
                        R.prop(category, groupedByCaregory)
                    ),
                }),
                R.toPairs(categoryMap.toObject())
            );
    }
);

export const getNightsWithMinPrice = () => createSelector(
    getQueryParam,
    getOffersFromPrices(),
    getQueryID,
    getQuery,
    (durationByNights, offers, queryID, query) => {
        const groupedByNights = R.groupBy(
            R.prop('nights'),
            R.concat(offers, getOffersListFromSearchMemory(queryID))
        );

        if (R.isEmpty(groupedByNights)) {
            return EMPTY_ARRAY;
        }

        const nights = R.range(
            durationByNights.get('from'),
            R.inc(durationByNights.get('to'))
        );

        return R.map(
            (night) => ({
                night,
                offerID: R.prop(night, groupedByNights)
                    ? R.call(
                        R.pipe(
                            R.prop(night),
                            sortOffersByMinPrice(query.get(QUERY_PARAMS.CURRENCY)),
                            R.head,
                            R.prop('id')
                        ),
                        groupedByNights
                    )
                    : undefined,
            }),
            nights
        );
    }
);

const getMeta = createSelector(
    searchByKey,
    R.propOr(EMPTY_OBJ, 'meta')
);

const getOperatorsLinks = createSelector(
    getMeta,
    R.pathOr(EMPTY_OBJ, ['links', 'operators'])
);

export const getOperatorLink = createSelector(
    getOperatorsLinks,
    (_, { operatorID }) => operatorID,
    (links, id) => R.prop(id, links)
);

const getHotels = () => createSelector(
    getFlattenPrices(),
    getQueryID,
    (prices, queryID) => R.concat(
        R.map(R.prop('hotelID'), prices),
        getUnusedHotelsFromSearchMemory(queryID)
    )
);

export const getHotelsTotal = () => createSelector(
    getHotels(),
    R.length
);

export const getOperatorsByHotelID = () => createSelector(
    getFlattenPrices(),
    getOffers(),
    getOperatorsMap(),
    (_, { hotelID }) => hotelID,
    (prices, offersHub, operatorsMap, hotelID) => R.call(
        R.pipe(
            R.find(R.propEq('hotelID', hotelID)),
            R.prop('offers'),
            R.map((id) => offersHub[id].operator),
            R.uniq,
            R.map((id) => operatorsMap[id])
        ),
        prices
    )
);

const getCharts = createSelector(
    domain,
    (search) => search.get('charts')
);

export const getChart = createSelector(
    getCharts,
    getQueryID,
    (charts, queryID) => charts.get(queryID, EMPTY_ARRAY)
);

export const getHotelsMarkers = () => createSelector(
    getFlattenPrices(),
    hotelsHub,
    (prices, hotels) => R.filter(
        Boolean,
        R.map(
            R.pipe(
                ({ hotelID, offers:[offerID] }) => R.mergeAll([
                    hotels[hotelID],
                    { offerID }
                ]),
                R.ifElse(
                    R.prop('location'),
                    ({ id, location, offerID, stars }) => ({
                        hotelID:  id,
                        offerID,
                        position: R.pick(['lat', 'lng'], location),
                        stars,
                        zoom:     location.zoom,
                    }),
                    R.always(null)
                )
            ),
            prices
        )
    )
);

export const getCenterByHotelsMarkers = () => createSelector(
    getHotelsMarkers(),
    (markers) => !R.isEmpty(markers)
        ? R.call(
            R.pipe(
                R.map(R.applySpec({
                    latitude:  R.path(['position', 'lat']),
                    longitude: R.path(['position', 'lng']),
                })),
                getCenter,
                R.applySpec({
                    lat: R.prop('latitude'),
                    lng: R.prop('longitude'),
                })
            ),
            markers
        )
        : undefined
);

export const getAvailableDates = R.useWith(
    (availableDates, key) => R.propOr(EMPTY_ARRAY, key, availableDates),
    [
        R.pipe(domain, (search) => search.get('availableDates')),
        R.prop('key')
    ]
);
