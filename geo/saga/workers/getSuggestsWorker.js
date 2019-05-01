// Core
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';

// Instruments
import { geoActions } from 'bus/geo/actions';
import { getToursSuggests } from '@otpusk/json-api';

export function* getSuggestsWorker ({ payload: key }) {
    yield delay(25);

    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const suggestions = yield call(getToursSuggests, token, key);

        yield put(geoActions.getSuggestsSuccess(key, suggestions));
    } catch (error) {
        yield put(geoActions.getSuggestsFail(error));
    }
}
