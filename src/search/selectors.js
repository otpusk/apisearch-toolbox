// Core
import { createSelector } from 'reselect';
import * as R from 'ramda';

import { offersSelectors } from './../offers';

import { sortOffersByMinPrice, sortHotelsByMinOffer } from './helpers';

const domain = (_) => _.search;

const defaultSearch = {};

export const searchByKey = () => createSelector(
    domain,
    (_, { queryID }) => queryID,
    (search, key) => R.call(
        R.ifElse(
            Boolean,
            (result) => result.toJS(),
            R.always(defaultSearch)
        ),
        search.getIn(['results', key])
    )
);

const getHotelsByPages = () => createSelector(
    searchByKey(),
    R.pipe(
        R.prop('hotels'),
        R.values
    )
);

export const getHotelsByMinPrice = () => createSelector(
    getHotelsByPages(),
    offersSelectors.offersHub,
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

export const isSetSearch = createSelector(
    searchByKey(),
    (search) => !R.isEmpty(search)
);

export const hotelsByKey = () => createSelector(
    getHotelsByPages(),
    R.reduce(R.mergeRight, {})
);

export const offersByKey = () => createSelector(
    hotelsByKey(),
    offersSelectors.offersHub,
    (hotels, offers) => R.pipe(
        R.values,
        R.flatten,
        R.map((offerID) => R.prop(offerID, offers)),
        R.filter(Boolean)
    )(hotels)
);

export const selectOperators = () => createSelector(
    searchByKey(),
    ({ operators }) => operators
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
    searchByKey(),
    R.prop('prices')
);

export const getError = () => createSelector(
    searchByKey(), R.prop('error')
);

export const isStart = createSelector(
    searchByKey(),
    ({ status }) => status === 'starting'
);
export const isDone = createSelector(
    searchByKey(),
    ({ status }) => status === 'done'
);
export const isSearch = createSelector(
    searchByKey(),
    ({ status }) => status === 'processing'
);
export const isFail = createSelector(
    searchByKey(),
    ({ status }) => status === 'failed'
);
