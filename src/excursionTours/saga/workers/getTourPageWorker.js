// Core
import { put, select } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';

export function* getTourPageWorker () {
    try {
        const url = yield select(({ router }) => router.getIn(['location', 'pathname']));
        const tourId = yield url.split('/')[3].split('-')[0];
        const tour = yield put(actions.getTour(tourId));

        yield put(actions.getTourSuccess(tourId, tour));

    } catch (error) {
        yield put(actions.getTourFail(error));
    }
}
