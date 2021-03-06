// Core
import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.offers;
const offerKey = (_, key) => key;

export const offersHub = createSelector(
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


export const getOffer = () => createSelector(
    offersHub,
    offerKey,
    (hub, key) => R.prop(key, hub)
);
