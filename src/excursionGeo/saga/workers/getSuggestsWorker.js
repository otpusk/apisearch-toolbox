// Core
import { call, put } from 'redux-saga/effects';
import { getSuggest } from '@otpusk/excursion-api';

// Instruments
import { actions } from '../../actions';

export function* getSuggestsWorker ({ payload: text }) {
    try {
        const suggestions = yield call(getSuggest, text);

        yield put(actions.getSuggestsSuccess(text, suggestions));
    } catch (error) {
        yield put(actions.getSuggestsFail(error));
    }
}
