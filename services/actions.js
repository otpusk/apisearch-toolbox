// Core
import { createActions } from 'redux-actions';

export const servicesActions = createActions({
    GET_SERVICES:         (countryId = null) => countryId,
    GET_SERVICES_SUCCESS: (services) => services,
    GET_SERVICES_FAIL:    (error) => error,
});
