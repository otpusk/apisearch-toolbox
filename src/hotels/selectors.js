// Core
import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.hotels.get('store');
const hotelKey = (_, key) => key;

export const hotelsHub = createSelector(
    domain,
    R.pipe(
        (hub) => hub.get('store'),
        R.ifElse(
            (v) => v.isEmpty(),
            () => ({}),
            (v) => v.toJS()
        )
    )
);

export const getHotel = () => createSelector(
    hotelsHub,
    hotelKey,
    (hub, key) => R.prop(key, hub)
);
