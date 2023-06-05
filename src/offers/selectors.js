import { createSelector } from 'reselect';
import * as R from 'ramda';
import moment from 'moment';

import { memoryInstances } from '../search/saga/workers/getResultsWorker/resultsMemory';

import {
    ACTUALIZED_OFFER_STATUS,
    ALIVE_OFFER_STATUS,
    EXPIRED_OFFER_STATUS
} from './constants';
import { isOfferKey, extractDataFromOfferKey } from "./helpers";

const EMPTY_OBJ = {};

const getOffersHubFromSearchMemory = (queryID) => R.prop(queryID, memoryInstances)
    ? memoryInstances[queryID].getValues().offersHub
    : {};

const domain = (_) => _.offers;
const getOfferID = (_, { offerID }) => {
    const { id, meta, key } =  isOfferKey(offerID) ? extractDataFromOfferKey(offerID) : { id: offerID };

    return {
        offerID: id,
        meta,
        key,
    };
};

const getOffersStore = createSelector(
    domain,
    (offers) => offers.get('store')
);

const getOffersStatuses = createSelector(
    domain,
    (offers) => offers.get('status')
);

export const getOfferStatus = createSelector(
    getOffersStatuses,
    getOfferID,
    (map, { offerID }) => map.get(offerID)
);

export const isAliveOffer = createSelector(
    getOfferStatus,
    R.equals(ALIVE_OFFER_STATUS)
);

export const isExpiredOffer = createSelector(
    getOfferStatus,
    R.equals(EXPIRED_OFFER_STATUS)
);

export const getOffers = () => createSelector(
    getOffersStore,
    (_, { queryID } = {}) => queryID,
    (store, queryID) => queryID
        ? R.mergeAll([
            store.toObject(),
            getOffersHubFromSearchMemory(queryID)
        ])
        : store.toObject()
);

export const getOffer = () => createSelector(
    getOffers(),
    getOfferID,
    (offers, { offerID, key, meta }) => R.when(
        Boolean,
        (offer) => meta ? R.mergeAll([offer, meta, { id: offerID }]) : offer,
        R.prop(key, offers)
    )
);

export const isActualLastUpdate = () => createSelector(
    getOffer(),
    (_, args) => args?.ttlAsMinutes ?? 20,
    ({ updateTime }, ttlAsMinutes) => {
        const isForceUpdate = ttlAsMinutes === 0;

        if (isForceUpdate) {
            return false;
        }

        const diffByNowAsMinutes = moment().diff(
            moment(updateTime),
            'minutes'
        );

        return R.lte(
            diffByNowAsMinutes,
            ttlAsMinutes
        );
    }
);

const actualizedOffersDomain = createSelector(
    domain,
    (_) => _.get('actualizedOffers')
);

const getActualizedEntity = () => createSelector(
    actualizedOffersDomain,
    getOfferID,
    (offer, { offerID }) => offer[offerID] || EMPTY_OBJ
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

const makeSelectorByStatus = (status) => () => createSelector(
    getActualizedStatus(),
    R.equals(status)
);

export const isConnectionFailedWithOperator = makeSelectorByStatus(
    ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION
);

export const isNotFoundActualizedOffer = makeSelectorByStatus(
    ACTUALIZED_OFFER_STATUS.NOT_FOUND
);

export const getIsStopSaleByHotel = makeSelectorByStatus(
    ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_HOTEL
);

export const getMessageByActualizedOffer = () => createSelector(
    getActualizedEntity(),
    R.prop('message')
);

export const isEndActualizedOffer = () => createSelector(
    getActualizedEntity(),
    R.propOr(false, 'completed')
);

export const isActualazingOffer = () => createSelector(
    getActualizedEntity(),
    R.propOr(false, 'loading')
);
