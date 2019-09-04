// Core
import { call, put } from 'redux-saga/effects';
import { getFilterDeparture } from '@otpusk/excursion-api';

// Instruments
import { actions } from '../../actions';

export function* getDepartureCitiesWorker ({ payload: countryId }) {
    try {
        const cities = yield call(getFilterDeparture, countryId);

        yield put(actions.getDepartureCitiesSuccess(countryId, cities));
    } catch (error) {
        yield put(actions.getDepartureCitiesFail(error));
    }
}
