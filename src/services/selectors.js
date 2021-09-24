import { createSelector } from 'reselect';
import * as R from 'ramda';

import { EMPTY_COUNTRY_ID } from './constants';

const EMPTY_OBJ = {};

const domain = (_) => _.services;

export const getLabels = createSelector(
    domain,
    R.prop('labels')
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
