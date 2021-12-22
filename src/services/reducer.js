// Core
import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { servicesActions } from './actions';

const initialState = {
    labels: {},
    store:  {},
};

export const servicesReducer = handleActions({
    [servicesActions.setLabels]: (state, { payload: labels }) => R.set(
        R.lensProp('labels'),
        labels,
        state
    ),
    [servicesActions.mergeLabels]: (state, { payload: labels }) => R.over(
        R.lensProp('labels'),
        (prevLables) => R.mergeAll([prevLables, labels]),
        state
    ),
    [servicesActions.getServicesSuccess]: (state, { payload }) => {
        const { countryId, services } = payload;

        return R.set(
            R.lensPath(['store', countryId]),
            services,
            state
        );
    },
}, initialState);
