// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { getLang, getToken } from '../../../auth/selectors';
import { geoActions } from '../../actions';
import { getToursFlightPort } from '@otpusk/json-api';

export function* getFlightPortWorker ({ payload: iata }) {
    try {
        const lang = yield select(getLang);
        const token = yield select(getToken);
        const port = yield call(getToursFlightPort, token, iata, { lang });

        yield put(geoActions.getFlightPortSuccess(iata, port));
    } catch (error) {
        yield put(geoActions.getFlightPortFail(error));
    }
}
