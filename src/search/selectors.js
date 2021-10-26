// Core
import { createSelector } from 'reselect';
import * as R from 'ramda';

import { getOffers } from './../offers/selectors';
import { hotelsHub } from './../hotels/selectors';
import { getQueryParam } from './../queries/selectors';

import { memoryInstances } from './saga/workers/getResultsWorker/resultsMemory';
import { sortOffersByMinPrice, sortHotelsByMinOffer } from './helpers';

const domain = (_) => _.search;
const getQueryID = (_, { queryID }) => queryID;

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

const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];

const getResults = createSelector(
    domain,
    (search) => search.get('results')
);

const searchByKey = createSelector(
    getResults,
    getQueryID,
    (results, key) => results.get(key) ? results.get(key).toJS() : EMPTY_OBJ
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
    getOffers,
    (pages, offersMap) => R.map(
        (hotelsMap) => R.call(
            R.pipe(
                R.toPairs,
                R.map(([hotelID, offersIDs]) => ({
                    hotelID,
                    offersIDs: R.call(
                        R.pipe(
                            R.map((id) => offersMap[id]),
                            sortOffersByMinPrice
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
    getOffers,
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

export const selectOperatorsWithMinPrice = () => createSelector(
    selectOperators(),
    offersByKey(),
    (operators, offers) => R.pipe(
        R.groupBy(R.prop('operator')),
        (grouped) => R.map(
            (oid) => [
                R.pipe(
                    R.set(R.lensProp('completed'), R.prop(oid, operators)),
                    R.set(R.lensProp('id'), Number(oid))
                )({}),
                R.prop(oid, grouped)
            ],
            R.keys(operators)
        ),
        R.map(([operator, grouped]) => [
            operator,
            R.when(
                Boolean,
                R.pipe(
                    sortOffersByMinPrice,
                    R.prop(0)
                )
            )(grouped)
        ])
    )(offers)
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
    getOffers,
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
    (operatorsMap, offers, queryID) => R.map(
        ([id, isReady]) => ({
            id:      Number(id),
            isReady,
            offerID: R.call(
                R.pipe(
                    R.filter(({ operator }) => operator === Number(id)),
                    sortOffersByMinPrice,
                    R.head,
                    R.prop('id')
                ),
                R.concat(
                    offers,
                    getOffersListFromSearchMemory(queryID)
                )
            ),
        }),
        R.toPairs(operatorsMap)
    )
);

export const getFoodsWithMinPrice = () => createSelector(
    getQueryParam,
    getOffersFromPrices(),
    getQueryID,
    (foodsMap, offers, queryID) => {
        const groupedByFood = R.groupBy(R.prop('food'), R.concat(
            offers,
            getOffersListFromSearchMemory(queryID)
        ));

        return R.map(
            ([code]) => ({
                code,
                offerID: R.prop(code, groupedByFood)
                    ? R.call(
                        R.pipe(
                            R.prop(code),
                            sortOffersByMinPrice,
                            R.head,
                            R.prop('id')
                        ),
                        groupedByFood
                    )
                    : undefined,
            }),
            R.toPairs(foodsMap.toObject())
        );
    }
);

export const getCategoryWithMinPrice = () => createSelector(
    getQueryParam,
    getFlattenPrices(),
    hotelsHub,
    getOffers,
    getQueryID,
    // eslint-disable-next-line max-params
    (categoryMap, prices, hotels, offers, queryID) => {
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

        return R.map(
            ([category]) => ({
                category,
                ...R.call(
                    R.ifElse(
                        Boolean,
                        R.pipe(
                            R.map(R.prop('offers')),
                            R.flatten,
                            sortOffersByMinPrice,
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
    (durationByNights, offers, queryID) => {
        const groupedByNights = R.groupBy(
            R.prop('nights'),
            R.concat(offers, getOffersListFromSearchMemory(queryID))
        );
        const nights = R.range(
            R.dec(durationByNights.get('from')),
            durationByNights.get('to')
        );

        return R.map(
            (night) => ({
                night,
                offerID: R.prop(night, groupedByNights)
                    ? R.call(
                        R.pipe(
                            R.prop(night),
                            sortOffersByMinPrice,
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
