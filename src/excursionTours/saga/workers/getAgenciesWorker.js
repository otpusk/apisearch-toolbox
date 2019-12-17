// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getAgencies } from '@otpusk/excursion-api';

export function* getAgenciesWorker ({ payload: { tourId, query } }) {
    try {
        const agencies = yield call(getAgencies, query);
        yield put(actions.getAgenciesSuccess(tourId, agencies));
    } catch (error) {
        yield put(actions.getAgenciesFail(error));
    }
}
