import { createSelector } from 'reselect';
import * as R from 'ramda';
const domain = _ref => {
  let {
    excursionTours
  } = _ref;
  return excursionTours;
};
const getID = (_, _ref2) => {
  let {
    offerID
  } = _ref2;
  return offerID;
};
export const getOffersHub = createSelector(domain, map => map.get('store'));
export const getOffer = () => createSelector(getOffersHub, getID, (hub, id) => R.prop(id, hub));