// Core
import { put, call, select } from 'redux-saga/effects';
import moment from 'moment';

// Instruments
import { actions } from '../../actions';
import { getSearchCount } from '@otpusk/excursion-api';

export function* getSearchCountWorker ({ payload: queryId }) {
    try {
        const query = yield select(({ excursionSearch }) => excursionSearch.getIn(['queries', queryId]));
        const formattedQuery = query.toMap()
            .map((value) => moment.isMoment(value) ? value.format('YYYY-MM-DD') : value)
            .map((value) => Array.isArray(value) && value.length === 0 ? false : value)
            .filter((value) => Boolean(value))
            .toJS();

        const excursionsCount = yield call(getSearchCount, formattedQuery);
        yield put(actions.getExcursionsCountSuccess(queryId, excursionsCount));
    } catch (error) {
        console.log(error);
        yield put(actions.getExcursionsCountFail(error));
    }
}
