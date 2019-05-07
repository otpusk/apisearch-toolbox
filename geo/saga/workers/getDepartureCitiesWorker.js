// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursDepartureCities } from '@otpusk/json-api';

export function* getDepartureCitiesWorker ({ payload: countryId }) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const departures = yield call(getToursDepartureCities, token, { geoId: countryId });

        yield put(geoActions.getDepartureCitiesSuccess(countryId, departures));
    } catch (error) {
        yield put(geoActions.getDepartureCitiesFail(error));
    }
}
