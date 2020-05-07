// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursGeoById } from '@otpusk/json-api';

export function* getLocationDataWorker ({ payload: { id }}) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const data = yield call(getToursGeoById, token, id);

        yield put(geoActions.getLocationDataSuccess(id, data));
    } catch (error) {
        yield put(geoActions.getLocationDataFail(error));
    }
}
