// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { getToken } from '../../../auth/selectors';
import { geoActions } from '../../actions';
import { getToursGeoById } from '@otpusk/json-api';

export function* getLocationDataWorker ({ payload: { id }}) {
    try {
        const token = yield select(getToken);
        const data = yield call(getToursGeoById, token, id, { with: 'price', nsv: 1 });

        yield put(geoActions.getLocationDataSuccess(id, data));
    } catch (error) {
        yield put(geoActions.getLocationDataFail(error));
    }
}
