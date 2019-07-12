// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursDepartureCities } from '@otpusk/json-api';

export function* getDepartureCitiesWorker ({ payload: countryId }) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang: auth.getIn(['otpusk', 'lang'], 'rus'),
        }));
        const departures = yield call(getToursDepartureCities, token, { geoId: countryId, lang });

        yield put(geoActions.getDepartureCitiesSuccess(countryId, departures));
    } catch (error) {
        yield put(geoActions.getDepartureCitiesFail(error));
    }
}
