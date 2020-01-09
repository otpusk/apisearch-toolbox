// Core
import { put, select } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';

export function* getTourPageWorker () {
    try {
        const url = yield select(({ router }) => router.getIn(['location', 'pathname']));
        const tourId = yield url.split('/')[3].split('-')[0];

        yield put(actions.getTour(tourId));
    } catch (error) {
        console.log(error);
        yield put(actions.getTourFail(error));
    }
}
