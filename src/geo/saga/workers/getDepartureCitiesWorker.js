// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { getLang, getToken } from '../../../auth/selectors';
import { geoActions } from '../../actions';
import { getToursDepartureCities } from '@otpusk/json-api';

export function* getDepartureCitiesWorker ({ payload }) {
    const { geoID, methodVersion } = payload;

    try {
        const lang = yield select(getLang);
        const token = yield select(getToken);
        const departures = yield call(
            getToursDepartureCities,
            token,
            { geoId: geoID, lang },
            methodVersion
        );

        yield put(geoActions.getDepartureCitiesSuccess(geoID, departures));
    } catch (error) {
        yield put(geoActions.getDepartureCitiesFail(error));
    }
}
