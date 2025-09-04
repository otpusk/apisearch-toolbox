import { call, put, select } from 'redux-saga/effects';
import moment from 'moment';
import { getSearch } from '@otpusk/excursion-api';

import { getLansAsQuery } from '../../../auth/selectors';
import { actions } from '../../actions';

export function* runSearchWorker ({ payload: { queryId, options : { withHash = true } = {}}}) {
    const langAsQuery = yield select(getLansAsQuery);
    const query = yield select(({ excursionSearch }) => excursionSearch.getIn(['queries', queryId]));
    const formattedQuery = query.toMap()
        .map((value) => moment(value, 'YYYY-MM-DD', true).isValid() ? moment(value).format('YYYY-MM-DD') : value)
        .map((value) => Array.isArray(value) && value.length === 0 ? false : value)
        .filter((value) => Boolean(value))
        .toJS();

    try {
        const { page } = formattedQuery;
        const tours = yield call(getSearch, {
            ...langAsQuery,
            ...formattedQuery,
        });

        if (withHash) {
            const hash = query.compileQuery();

            window.location.hash = hash;
        }

        yield put(actions.processSearch(queryId, page, tours));
        yield put(actions.finishSearch(queryId));
    } catch (error) {
        yield put(actions.failSearch(queryId));
    }
}
