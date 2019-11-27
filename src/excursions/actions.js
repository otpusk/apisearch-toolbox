// Core
import { createActions } from 'redux-actions';

export const excursionsActions = createActions({
    GET_EXCURSION:         (excursion) => ({excursion}),
    GET_EXCURSION_SUCCESS: (excursion, excursionData) => ({ excursion, excursionData }),
    GET_EXCURSION_FAIL:    (error) => error,
});
