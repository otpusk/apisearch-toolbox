import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.reviews;

const getTurpravdaWidgets = createSelector(
    domain,
    R.prop('turpravdaWidget')
);

export const getTurpravdaWidget = createSelector(
    getTurpravdaWidgets,
    (_, { hotelID }) => hotelID,
    (widgets, id) => widgets[id]
);
