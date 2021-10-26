import { createSelector } from 'reselect';
import * as R from 'ramda';

import { memoryInstances } from '../search/saga/workers/getResultsWorker/resultsMemory';

const getOffersHubFromSearchMemory = (queryID) => R.prop(queryID, memoryInstances)
    ? memoryInstances[queryID].getValues().offersHub
    : {};

const domain = (_) => _.offers;

const getOffersStore = createSelector(
    domain,
    (offers) => offers.get('store')
);

export const getOffers = createSelector(
    getOffersStore,
    (_, { queryID } = {}) => queryID,
    (offersStore, queryID) => R.call(
        R.when(
            R.always(queryID),
            (offers) => R.mergeAll([offers, getOffersHubFromSearchMemory(queryID)])
        ),
        offersStore.toJS()
    )
);

export const getOffer = createSelector(
    getOffers,
    (_, { offerID }) => offerID,
    (offers, offerID) => R.prop(offerID, offers)
);
