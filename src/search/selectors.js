// Core
import { createSelector } from 'reselect';
import * as R from 'ramda';
import { Map } from 'immutable';

// Instruments
import { offersSelectors } from './../offers';

const domain = (_) => _.search;

export const searchByKey = () => createSelector(
    domain,
    (_, { queryID }) => queryID,
    (search, key) => search.getIn(['results', key], Map()).toJS()
);

export const hotelsByKey = () => createSelector(
    searchByKey(),
    R.pipe(
        R.prop('hotels'),
        R.values,
        R.reduce(R.mergeRight, {})
    )
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
                    R.sortBy(R.ascend(R.path(['price', 'uah']))),
                    R.prop(0)
                )
            )(grouped)
        ])
    )(offers)
);

export const getError = () => createSelector(
    searchByKey(), R.prop('error')
);
