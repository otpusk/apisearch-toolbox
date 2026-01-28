// Core
import { put, select } from 'redux-saga/effects';
import { Set, List } from 'immutable';

// Instruments
import { queriesActions } from '../../actions';
import { searchActions } from '../../../search/actions';
import { QUERY_PARAMS, GLUE } from '../../fn';
import {
    binaryParser,
    datesParser,
    rangeParser,
    createImmutableArrayParser,
    createImmutableNumbersArrayParser
} from '../../parsers';

function* parseQueryParam (paramName, rawValue, queryId) {
    const token = yield select(getToken)
    const currentValue = yield select((state) => state.queries.get(queryId).get(paramName, null));

    const paramsToParsers = {
        [QUERY_PARAMS.AUTOSTART]: Boolean,
        [QUERY_PARAMS.DEPARTURE]: Number,
        [QUERY_PARAMS.CATEGORY]:  binaryParser,
        [QUERY_PARAMS.TRANSPORT]: binaryParser,
        [QUERY_PARAMS.FOOD]:      binaryParser,
        [QUERY_PARAMS.DATES]:     datesParser,
        [QUERY_PARAMS.DURATION]:  rangeParser,
        [QUERY_PARAMS.ADULTS]:    Number,
        [QUERY_PARAMS.CHILDREN]:  createImmutableNumbersArrayParser(List),
        [QUERY_PARAMS.COUNTRY]:   String,
        [QUERY_PARAMS.CITIES]:    createImmutableNumbersArrayParser(Set),
        [QUERY_PARAMS.HOTELS]:    createImmutableNumbersArrayParser(Set),
        [QUERY_PARAMS.PRICE]:     rangeParser,
        [QUERY_PARAMS.SERVICES]:  createImmutableArrayParser(Set),
    };

    if (rawValue !== GLUE.empty) {
        const parsedValue = yield paramsToParsers[paramName](rawValue, { prevValue: currentValue, token });

        if (parsedValue) {
            yield put(queriesActions.changeQueryParam(queryId, paramName, parsedValue));
        }
    }
}

export function* parseQueryStringWorker ({ payload: { queryString, queryId }}) {
    const baseQuery = yield select((state) => state.queries.get(queryId));
    const queryParams = queryString.replace('#/', '').split('/');

    try {
        for (const [paramName] of baseQuery) {
            const position = baseQuery.keySeq().findIndex((f) => f === paramName);
            const rawValue = position in queryParams ? queryParams[position] : null;

            if (rawValue) {
                yield parseQueryParam(paramName, rawValue, queryId);
            }

        }
        yield put(queriesActions.parseQueryStringSuccess(queryId));
    } catch (error) {
        yield put(queriesActions.parseQueryStringFail(error));
    }

    const resultQuery = yield select((state) => state.queries.get(queryId));

    if (resultQuery.get(QUERY_PARAMS.AUTOSTART) === true) {
        yield put(searchActions.runSearch(queryId));
    }

}
