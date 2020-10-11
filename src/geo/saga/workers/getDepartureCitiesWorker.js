// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursDepartureCities } from '@otpusk/json-api';

export function* getDepartureCitiesWorker ({ payload: geoID }) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang:  auth.getIn(['otpusk', 'lang'], 'rus'),
        }));
        const departures = yield call(getToursDepartureCities, token, { geoId: geoID, lang });

        yield put(geoActions.getDepartureCitiesSuccess(geoID, departures));
    } catch (error) {
        yield put(geoActions.getDepartureCitiesFail(error));
    }
}
