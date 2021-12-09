import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.hotels;
const hotelKey = (_, key) => key;

const EMPTY_OBJ = {};

const getHotelsStore = createSelector(
    domain,
    (hotels) => hotels.get('store')
);

export const hotelsHub = createSelector(
    getHotelsStore,
    R.ifElse(
        (v) => v.isEmpty(),
        R.always(EMPTY_OBJ),
        (v) => v.toJS()
    )
);

export const getHotel = () => createSelector(
    hotelsHub,
    hotelKey,
    (hub, key) => R.prop(key, hub)
);
