// Core
import { select, put } from 'redux-saga/effects';

// Instruments
import { QUERY_PARAMS } from '../../../queries/fn';
import { searchActions } from '../../../search/actions';
import { queriesActions } from '../../../queries/actions';

export function* submitSearchWorker ({ payload: { queryId, targetPage = null }}) {
    const { query, location } = yield select((state) => ({
        query:    state.queries.get(queryId),
        location: state.router.location,
    }));

    const searchCountryId = query.get(QUERY_PARAMS.COUNTRY);

    if (searchCountryId) {
        yield put(queriesActions.changeQueryParam(QUERY_PARAMS.AUTOSTART, true, queryId));
        yield put(queriesActions.compileQueryString(queryId));
        yield put(searchActions.runSearch(queryId));
    }
}
