import * as R from 'ramda';

import { SORT_BY_PRICE } from '../../../../queries/constants';

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

const sortOffers = (offersHub, currency) => (offers) => R.call(
    R.pipe(
        R.map((offerID) => offersHub[offerID]),
        R.sort(R.ascend(R.path(['price', currency])))
    ),
    offers
);

const sortPrices = (currency) => (prices) => R.sort(
    R.ascend(R.path(['offers', 0, 'price', currency])),
    prices
);

const sortByReviews = (ratingsA, ratingsB) => R.descend(
    R.reduce((acc, { reviews }) => R.add(acc, reviews), 0),
    ratingsA,
    ratingsB
);

const sortPricesByRatings = (hotelsHub) => (prices) => R.sort(
    ({ hotelID: idA }, { hotelID: idB }) => {
        const { averageRating: averageRatingA, sourceRatings: ratingsA } = hotelsHub[idA];
        const { averageRating: averageRatingB, sourceRatings: ratingsB } = hotelsHub[idB];

        return averageRatingA === averageRatingB
            ? sortByReviews(ratingsA, ratingsB)
            : averageRatingB - averageRatingA;
    },
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

export const generateNextPrices = (prices, offersHub, currency, sortBy, hotelsHub, selectedOperators = []) => R.call(
    R.pipe(
        convertPricesListToMap,
        R.toPairs,
        R.map(([, price]) => R.over(
            R.lensProp('offers'),
            sortOffers(offersHub, currency),
            price
        )),
        R.when(
            () => !R.isEmpty(selectedOperators),
            R.filter(
                ({ offers }) => offers.some(({ operator }) => R.includes(operator, selectedOperators))
            )
        ),
        sortBy === SORT_BY_PRICE
            ? sortPrices(currency)
            : sortPricesByRatings(hotelsHub),
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


export const getTotalBySelectedOperators = ({ offersHub, prices, selectedOperators }) => {
    const selectedOperatorsSet = new Set(selectedOperators);

    return R.pipe(
        R.when(
            () => selectedOperatorsSet.size,
            R.pipe(
                convertPricesListToMap,
                R.values,
                R.map(R.over(
                    R.lensProp('offers'),
                    R.filter((offerID) => selectedOperatorsSet.has(offersHub[offerID].operator))
                )),
                R.filter(({ offers }) => !R.isEmpty(offers))
            )
        ),
        R.length
    )(prices);
};
