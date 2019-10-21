// Core
import { call, put, select } from 'redux-saga/effects';
import { Range, Set } from 'immutable';

// Instrumetns
import { getToursGraph } from '@otpusk/json-api';
import { searchActions as actions } from '../../actions';
import { QUERY_PARAMS } from '../../../queries/fn';

const computedToParam = (query) => {
    switch (true) {
        case query.get(QUERY_PARAMS.HOTELS, Set()).size === 1: return query.get(QUERY_PARAMS.HOTELS).first();
        case query.get(QUERY_PARAMS.CITIES, Set()).size === 1: return query.get(QUERY_PARAMS.CITIES).first();
        default: return query.get(QUERY_PARAMS.COUNTRY);
    }
};

export function* getPriceChartWorker ({ payload: queryId }) {
    try {
        const { query, token } = yield select(({ queries, auth }) => ({
            query: queries.get(queryId),
            token: auth.getIn(['otpusk', 'token']),
        }));
        const params = {
            to:      computedToParam(query),
            from:    query.get(QUERY_PARAMS.DEPARTURE),
            checkIn: query.get(QUERY_PARAMS.DATES).get('from').format('YYYY-MM-DD'),
            checkTo: query.get(QUERY_PARAMS.DATES).get('from').clone().add(30, 'days').format('YYYY-MM-DD'),
            people:  `${query.get(QUERY_PARAMS.ADULTS)}${query.get(QUERY_PARAMS.CHILDREN).map((age) => age < 10 ? `0${age}` : age).join('')}`,
            nights:  Range(query.get(QUERY_PARAMS.DURATION).get('from'), query.get(QUERY_PARAMS.DURATION).get('to') + 1).toList().join(','),
        };
        const chart = yield call(getToursGraph, token, params);

        yield put(actions.getPriceChartSuccess(queryId, chart));
    } catch (error) {
        console.error(error);
        yield put(actions.getPriceChartFail(error));
    }
}
