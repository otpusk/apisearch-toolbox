// Core
import { select, put } from 'redux-saga/effects';
import { replace } from 'connected-react-router';

// Instruments
import { QUERY_PARAMS } from 'helpers/query';
import { searchActions } from '/search/actions';
import { queriesActions } from '/queries/actions';
import { book } from 'routes/book';

export function* submitSearchWorker ({ payload: queryId }) {
    const { query, location } = yield select((state) => ({
        query:    state.queries.get(queryId),
        location: state.router.location,
    }));

    if (query.get(QUERY_PARAMS.COUNTRY)) {
        if (location.pathname === book.searchPage) {
            yield put(searchActions.runSearch(queryId));
        } else {
            yield put(replace(book.searchPage));
        }

        yield put(queriesActions.changeQueryParam(QUERY_PARAMS.AUTOSTART, true, queryId));
        yield put(queriesActions.compileQueryString(queryId));
    }
}
