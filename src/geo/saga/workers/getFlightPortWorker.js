// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursFlightPort } from '@otpusk/json-api';

export function* getFlightPortWorker ({ payload: iata }) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang:  auth.getIn(['otpusk', 'lang'], 'rus'),
        }));
        const port = yield call(getToursFlightPort, token, iata, { lang });

        yield put(geoActions.getFlightPortSuccess(iata, port));
    } catch (error) {
        yield put(geoActions.getFlightPortFail(error));
    }
}
