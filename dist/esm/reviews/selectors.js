import { createSelector } from 'reselect';
import * as R from 'ramda';
const domain = _ => _.reviews;
const getTurpravdaWidgets = createSelector(domain, R.prop('turpravdaWidget'));
export const getTurpravdaWidget = createSelector(getTurpravdaWidgets, (_, _ref) => {
  let {
    hotelID
  } = _ref;
  return hotelID;
}, (widgets, id) => widgets[id]);