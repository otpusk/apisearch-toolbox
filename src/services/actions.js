// Core
import { createActions } from 'redux-actions';

export const servicesActions = createActions({
    GET_SERVICES:         (countryId = null) => countryId,
    GET_SERVICES_SUCCESS: (countryId, services) => ({ countryId, services }),
    GET_SERVICES_FAIL:    (error) => error,

    SET_LABELS: (labels) => labels,
});
