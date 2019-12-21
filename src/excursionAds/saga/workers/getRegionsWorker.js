// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getAgencies } from '@otpusk/excursion-api';

export function* getRegionsWorker ({ payload: query }) {
    try {
        const { regions } = yield call(getAgencies, query);

        yield put(actions.getRegionsSuccess(regions));
    } catch (error) {
        yield put(actions.getRegionsFail(error));
    }
}
