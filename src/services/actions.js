import { createActions } from 'redux-actions';

import { EMPTY_COUNTRY_ID } from './constants';

export const servicesActions = createActions({
    GET_SERVICES:         (countryId) => countryId,
    GET_ALL_SERVICES:     () => EMPTY_COUNTRY_ID,
    GET_SERVICES_SUCCESS: (countryId, services) => ({ countryId, services }),
    GET_SERVICES_FAIL:    (error) => error,

    SET_LABELS:   (labels) => labels,
    MERGE_LABELS: (labels) => labels,
});
