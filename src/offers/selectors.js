import { createSelector } from 'reselect';
import * as R from 'ramda';
import moment from 'moment';

import { memoryInstances } from '../search/saga/workers/getResultsWorker/resultsMemory';

import { ACTUALIZED_OFFER_STATUS } from './constants';

const EMPTY_OBJ = {};

const getOffersHubFromSearchMemory = (queryID) => R.prop(queryID, memoryInstances)
    ? memoryInstances[queryID].getValues().offersHub
    : {};

const domain = (_) => _.offers;
const getOfferID = (_, { offerID }) => offerID;

const getOffersStore = createSelector(
    domain,
    (offers) => offers.get('store')
);

export const getOffers = () => createSelector(
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

export const getOffer = () => createSelector(
    getOffers(),
    getOfferID,
    (offers, offerID) => R.prop(offerID, offers)
);

export const isActualLastUpdate = () => createSelector(
    getOffer(),
    ({ updateTime }) => moment().diff(
        moment(updateTime),
        'minutes'
    ) <= 20
);

const actualizedOffersDomain = createSelector(
    domain,
    (_) => _.get('actualizedOffers')
);

const getActualizedEntity = () => createSelector(
    actualizedOffersDomain,
    getOfferID,
    (offer, id) => offer[id] || EMPTY_OBJ
);

export const getActualizedOffer = () => createSelector(
    getActualizedEntity(),
    R.prop('offer')
);

const getActualizedStatus = () => createSelector(
    getActualizedEntity(),
    R.prop('actualizedStatus')
);

export const isActualizedOffer = () => createSelector(
    getActualizedStatus(),
    R.ifElse(
        Boolean,
        (status) => status === ACTUALIZED_OFFER_STATUS.ACTUALIZED,
        R.F
    )
);

export const isConnectionFailedWithOperator = () => createSelector(
    getActualizedStatus(),
    (status) => status === ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION
);

export const isEndActualizedOffer = () => createSelector(
    getActualizedEntity(),
    R.ifElse(
        Boolean,
        R.propOr(false, 'completed'),
        R.F
    )
);
