import { createSelector } from 'reselect';
import * as R from 'ramda';

import { getLang } from '../auth/selectors';

import { EMPTY_COUNTRY_ID, STATIC_LABELS_BY_LANG } from './constants';
import { createBookingServicesKey } from './helpers';

const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];

const domain = (_) => _.services;

const getCommonLabesl = createSelector(
    domain,
    R.prop('labels')
);

export const getLabels = createSelector(
    getCommonLabesl,
    getLang,
    (labels, lang) => R.mergeAll([
        labels,
        STATIC_LABELS_BY_LANG[lang] || STATIC_LABELS_BY_LANG.rus
    ])
);

const getServicesStore = createSelector(
    domain,
    R.prop('store')
);

export const getAllServices = createSelector(
    getServicesStore,
    (servicesStore) => R.propOr(EMPTY_OBJ, EMPTY_COUNTRY_ID, servicesStore)
);

export const getServicesByCountryID = createSelector(
    getServicesStore,
    (_, { countryID }) => countryID,
    (servicesStore, countryID) => R.propOr(EMPTY_OBJ, countryID, servicesStore)
);

export const getCommonServicesByCountry = createSelector(
    getServicesByCountryID,
    (servicesMap) => R.isEmpty(servicesMap)
        ? servicesMap
        : {
            beach:      servicesMap.beach,
            main:       servicesMap.main,
            sport:      servicesMap.sport,
            child:      servicesMap.child,
            renovation: servicesMap.renovation,
        }
);

export const getServicesIconsForHotel = createSelector(
    getServicesByCountryID,
    R.propOr(EMPTY_ARRAY, 'icons')
);

const getBookingServices = R.pipe(
    domain,
    R.prop('booking')
);

export const getBookingServicesByOffer = createSelector(
    getBookingServices,
    (_, { offerID, currency }) => createBookingServicesKey(offerID, currency),
    (servicesMap, key) => R.propOr(EMPTY_ARRAY, key, servicesMap)
);
