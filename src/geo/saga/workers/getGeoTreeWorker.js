// Core
import { put, call, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursSuggests } from '@otpusk/json-api';

export function* getGeoTreeWorker () {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const lang = yield select((state) => state.auth.getIn(['otpusk', 'lang'], 'rus'));

        const geoTree = yield call(getToursSuggests, token, null, { lang, 'with': 'price&city', nsv: 1 });

        yield put(geoActions.getGeoTreeSuccess(geoTree));
    } catch (error) {
        yield put(geoActions.getGeoTreeFail(error));
    }
}
