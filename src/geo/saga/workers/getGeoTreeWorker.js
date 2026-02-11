// Core
import { put, call, select } from 'redux-saga/effects';

// Instruments
import { getLang, getToken } from '../../../auth/selectors';
import { geoActions } from '../../actions';
import { getToursSuggests } from '@otpusk/json-api';

export function* getGeoTreeWorker () {
    try {
        const token = yield select(getToken);
        const lang = yield select(getLang);

        const geoTree = yield call(getToursSuggests, token, null, { lang, 'with': 'price&city', nsv: 1 });

        yield put(geoActions.getGeoTreeSuccess(geoTree));
    } catch (error) {
        yield put(geoActions.getGeoTreeFail(error));
    }
}
