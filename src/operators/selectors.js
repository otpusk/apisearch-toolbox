import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.operators;
const getDate = (_, { date }) => date;
const getKey = (_, { key }) => key;

export const getRates = () => createSelector(
    domain, getKey, (operators, key) => operators.getIn(['rates', key])
);

export const getRatesByDate = () => createSelector(
    getRates(), getDate,
    (rates, date) => R.prop(date, rates)
);
