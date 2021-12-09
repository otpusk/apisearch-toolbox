import * as R from 'ramda';

import { COUNT_AT_PAGE } from './constants';

export const getIgnoreOperators = (operators) => R.call(
    R.pipe(R.toPairs, R.filter(([, isReady]) => isReady), R.map(R.head)),
    operators
);

const stringifyOperators = (operators) => R.join(',', operators);

export const addIgnoreOperators = (query, ignoreOperators) => R.call(
    R.pipe(
        stringifyOperators,
        (stringifyIgnoreOperators) => query.ignoreOperators =
            query.ignoreOperators
                ? R.concat(`${query.ignoreOperators},`, stringifyIgnoreOperators)
                : stringifyIgnoreOperators
    ),
    ignoreOperators
);

export const getHotelsIDsFromPrices = (prices) => R.map(R.prop('hotelID'), prices);

const sortOffers = (offersHub) => (offers) => R.call(
    R.pipe(
        R.map((offerID) => offersHub[offerID]),
        R.sort(R.ascend(R.path(['price', 'uah'])))
    ),
    offers
);

const sortPrices = (prices) => R.sort(
    R.ascend(R.path(['offers', 0, 'price', 'uah'])),
    prices
);

const convertPricesListToMap = (prices) => R.reduce(
    (acc, price) => R.over(
        R.lensProp(price.hotelID),
        (prevPrice) => prevPrice
            ? R.over(R.lensProp('offers'), (offers) => R.concat(offers, price.offers), prevPrice)
            : price,
        acc
    ),
    {},
    prices
);

const simplifyPrices = (prices) => R.map(
    R.over(
        R.lensProp('offers'),
        R.map(R.prop('id'))
    ),
    prices
);

export const generateNextPrices = (prices, offersHub) => R.call(
    R.pipe(
        convertPricesListToMap,
        R.toPairs,
        R.map(([, price]) => R.over(
            R.lensProp('offers'),
            sortOffers(offersHub),
            price
        )),
        sortPrices,
        simplifyPrices,
        R.take(COUNT_AT_PAGE)
    ),
    prices
);

export const getHotelsEntitiesMap = (prices, hotelsHub, hotelsFromStore) => R.call(
    R.pipe(
        R.filter(({ hotelID }) => !hotelsFromStore[hotelID]),
        R.map(({ hotelID }) => [hotelID, hotelsHub[hotelID]]),
        R.fromPairs
    ),
    prices
);

export const getOffersEntitiesMap = (prices, offersHub) => R.call(
    R.pipe(
        R.map(R.prop('offers')),
        R.flatten,
        R.map((offerID) => [offerID, offersHub[offerID]]),
        R.fromPairs
    ),
    prices
);

export const getUnusedPrices = (nextPrices, unusedPrices) => R.call(
    R.pipe(
        getHotelsIDsFromPrices,
        (usedHotels) => R.filter(
            ({ hotelID }) => !R.includes(hotelID, usedHotels),
            unusedPrices
        )
    ),
    nextPrices
);
