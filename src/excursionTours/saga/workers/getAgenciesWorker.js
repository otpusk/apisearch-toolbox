// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getAgencies } from '@otpusk/excursion-api';

export function* getAgenciesWorker ({ payload: query }) {
    try {
        const agencies = yield call(getAgencies, query);
        const { cruiseId: tourId } = query.params;
        yield put(actions.getAgenciesSuccess(tourId, agencies));
    } catch (error) {
        yield put(actions.getAgenciesFail(error));
    }
}
