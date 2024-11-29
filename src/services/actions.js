import { createActions } from 'redux-actions';

import { EMPTY_COUNTRY_ID } from './constants';
import { createBookingServicesKey } from './helpers';

export const servicesActions = createActions({
    GET_SERVICES:         (countryId) => countryId,
    GET_ALL_SERVICES:     () => EMPTY_COUNTRY_ID,
    GET_SERVICES_SUCCESS: (countryId, services) => ({ countryId, services }),
    GET_SERVICES_FAIL:    (error) => error,

    SET_LABELS:   (labels) => labels,
    MERGE_LABELS: (labels) => labels,

    GET_BOOKING_SERVICES:      (offerID, currency) => ({ offerID, currency }),
    GET_BOOKING_SERVICES_FAIL: (error) => error,

    SET_BOOKING_SERVICES:         (key, services) => ({ key, services }),
    RESET_BOOKING_SERVICES:       (offerID, currency) => createBookingServicesKey(offerID, currency),
    setBookingServicesBySource:   (key, services, source) => ({ key, services, source }),
    resetBookingServicesBySource: (offerID, currency, source) => ({ key: createBookingServicesKey(offerID, currency), source }),
});
