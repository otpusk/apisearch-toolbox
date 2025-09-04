import { put, call, select } from 'redux-saga/effects';
import moment from 'moment';
import { getSearchCount } from '@otpusk/excursion-api';

import { getLansAsQuery } from '../../../auth/selectors';
import { actions } from '../../actions';

export function* getSearchCountWorker ({ payload: queryId }) {
    const langAsQuery = yield select(getLansAsQuery);
    const query = yield select(({ excursionSearch }) => excursionSearch.getIn(['queries', queryId]));
    const formattedQuery = query.toMap()
        .map((value) => moment.isMoment(value) ? value.format('YYYY-MM-DD') : value)
        .map((value) => Array.isArray(value) && value.length === 0 ? false : value)
        .filter((value) => Boolean(value))
        .toJS();

    try {
        const excursionsCount = yield call(getSearchCount, {
            ...langAsQuery,
            ...formattedQuery,
        });

        yield put(actions.getExcursionsCountSuccess(queryId, excursionsCount));
    } catch (error) {
        console.log(error);
        yield put(actions.getExcursionsCountFail(error));
    }
}
