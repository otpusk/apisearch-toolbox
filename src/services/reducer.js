import * as R from 'ramda';
import { handleActions } from 'redux-actions';

import { servicesActions } from './actions';

const initialState = {
    labels:  {},
    store:   {},
    booking: {},
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
    [servicesActions.setBookingServices]: (state, { payload }) => {
        const { key, services } = payload;

        return R.assocPath(['booking', key], services, state);
    },
    [servicesActions.resetBookingServices]: (state, { payload: key }) => {
        return R.dissocPath(['booking', key], state);
    },
    [servicesActions.setBookingServicesBySource]: (state, { payload }) => {
        const { key, services, source } = payload;

        const prev = R.propOr([], ['booking', key], state);


        const next = R.pipe(
            R.reject(R.propEq(source, 'source')),
            R.concat(services)
        )(prev);


        console.log('key', key);
        console.log('source', source);
        console.log('prev', prev);
        console.log('next', next);

        return R.assocPath(['booking', key], next, state);
    },
    [servicesActions.resetBookingServicesBySource]: (state, { payload }) => {
        const { key, source } = payload;


        const next = R.pipe(
            R.path(['booking', key]),
            R.reject(R.propEq(source, 'source'))
        )(state);

        console.log('key', key);
        console.log('source', source);
        console.log('next', next);


        if (R.isEmpty(next)) {
            return R.dissocPath(['booking', key], state);
        }

        return R.assocPath(['booking', key], next, state);
    },
}, initialState);
