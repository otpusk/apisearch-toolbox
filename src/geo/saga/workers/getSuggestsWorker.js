// Core
import { put, call, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursSuggests } from '@otpusk/json-api';

export function* getSuggestsWorker ({ payload: key }) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const lang = yield select((state) => state.auth.getIn(['otpusk', 'lang'], 'rus'));

        const suggestions = yield call(getToursSuggests, token, key, { lang, 'with': 'price' });

        yield put(geoActions.getSuggestsSuccess(key, suggestions));
    } catch (error) {
        yield put(geoActions.getSuggestsFail(error));
    }
}
