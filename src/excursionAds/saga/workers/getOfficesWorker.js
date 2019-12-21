// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getAgencies } from '@otpusk/excursion-api';

export function* getOfficesWorker ({ payload: query }) {
    try {
        const { offices } = yield call(getAgencies, query);
        const { cruiseId: tourId } = query.params;

        yield put(actions.getOfficesSuccess(tourId, offices));
    } catch (error) {
        yield put(actions.getOfficesFail(error));
    }
}
