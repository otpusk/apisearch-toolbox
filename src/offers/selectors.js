// Core
import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.offers;

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
