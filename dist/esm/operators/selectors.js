import { createSelector } from 'reselect';
import * as R from 'ramda';
const domain = _ => _.operators;
const getDate = (_, _ref) => {
  let {
    date
  } = _ref;
  return date;
};
const getKey = (_, _ref2) => {
  let {
    key
  } = _ref2;
  return key;
};
export const getRates = () => createSelector(domain, getKey, (operators, key) => operators.getIn(['rates', key]));
export const getRatesByDate = () => createSelector(getRates(), getDate, (rates, date) => R.prop(date, rates));