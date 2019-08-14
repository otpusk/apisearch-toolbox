// Core
import { select } from 'redux-saga/effects';

// Instrumetns
import { compileQuery } from '../../fn';

export function* compileQueryStringWorker ({ payload: { queryId }}) {
    const query = yield select((state) => state.queries.get(queryId));

    window.location.hash = compileQuery(query);
}
