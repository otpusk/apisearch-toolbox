// Core
import { call, put, select } from 'redux-saga/effects';
import moment from 'moment';

// Instruments
import { actions } from '../../actions';
import { getSearch } from '@otpusk/excursion-api';

export function* runSearchWorker ({ payload: queryId }) {
    try {
        const query = yield select(({ excursionSearch }) => excursionSearch.getIn(['queries', queryId]));
        const formattedQuery = query.toMap()
            .map((value) => moment.isMoment(value) ? value.format('YYYY-MM-DD') : value)
            .map((value) => Array.isArray(value) && value.length === 0 ? false : value)
            .filter((value) => Boolean(value))
            .toJS();

        const { page } = formattedQuery;
        const tours = yield call(getSearch, formattedQuery);

        const hash = query.compileQuery();

        window.location.hash = hash;
        yield put(actions.processSearch(queryId, page, tours));
        yield put(actions.finishSearch(queryId));
    } catch (error) {
        yield put(actions.failSearch(queryId));
    }
}
