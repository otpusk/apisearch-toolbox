import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.reviews;

const getTurpravdaWidgets = createSelector(
    domain,
    R.prop('turpravdaReviews')
);

const getTurpravdaHotels = createSelector(
    domain,
    R.prop('turpravdaHotels')
);

export const getTurpravdaWidget = createSelector(
    getTurpravdaWidgets,
    (_, { hotelID }) => hotelID,
    (widgets, id) => widgets[id]
);

export const getTurpravdaHotel = createSelector(
    getTurpravdaHotels,
    (_, { hotelID }) => hotelID,
    (hotels, id) => hotels[id]
);
