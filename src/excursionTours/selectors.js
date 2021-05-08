import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = ({ excursionTours }) => excursionTours;
const getID = (_, { offerID }) => offerID;

export const getOffersHub = createSelector(
    domain, (map) => map.get('store')
);

export const getOffer = () => createSelector(
    getOffersHub, getID,
    (hub, id) => R.prop(id, hub)
);
