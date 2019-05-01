// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from 'bus/geo/actions';
import { getToursCities } from '@otpusk/json-api';

export function* getCitiesWorker ({ payload: countryId }) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const cities = yield call(getToursCities, token, countryId);

        yield put(geoActions.getCitiesSuccess(countryId, cities));
    } catch (error) {
        yield put(geoActions.getCitiesFail(error));
    }
}
