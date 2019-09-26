// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getSearch } from '@otpusk/excursion-api';

export function* runSearchWorker ({ payload: queryId }) {
    try {
        const query = yield select(({ excursionSearch }) => excursionSearch.getIn(['queries', queryId]));
        const tours = yield call(getSearch, queryId, query.toJS());

        yield put(actions.processSearch(queryId, tours));
        yield put(actions.finishSearch(queryId));
    } catch (error) {
        yield put(actions.failSearch(error));
    }
}
