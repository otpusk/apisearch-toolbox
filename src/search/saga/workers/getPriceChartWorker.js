import { call, put, select } from 'redux-saga/effects';
import { getToursGraph } from '@otpusk/json-api';

import { searchActions as actions } from '../../actions';
import { QUERY_PARAMS } from '../../../queries/fn';

const computedToParam = (query) => {
    const IS_SET_SINGLE_HOTEL = query.get(QUERY_PARAMS.HOTELS).size === 1;
    const IS_SET_SINGLE_CITY = query.get(QUERY_PARAMS.CITIES).size === 1;

    if (IS_SET_SINGLE_HOTEL) {
        return query.get(QUERY_PARAMS.HOTELS).first();
    }

    if (IS_SET_SINGLE_CITY) {
        return query.get(QUERY_PARAMS.CITIES).first();
    }

    return query.get(QUERY_PARAMS.COUNTRY);
};

export function* getPriceChartWorker ({ payload }) {
    const { queryId, duration } = payload;

    try {
        const { query, token } = yield select(({ queries, auth }) => ({
            query: queries.get(queryId),
            token: auth.getIn(['otpusk', 'token']),
        }));
        const params = {
            to:       computedToParam(query),
            from:     query.get(QUERY_PARAMS.DEPARTURE),
            checkIn:  query.get(QUERY_PARAMS.DATES).get('from').format('YYYY-MM-DD'),
            checkTo:  query.get(QUERY_PARAMS.DATES).get('from').clone().add(duration || 30, 'days').format('YYYY-MM-DD'),
            people:   `${query.get(QUERY_PARAMS.ADULTS)}${query.get(QUERY_PARAMS.CHILDREN).map((age) => age < 10 ? `0${age}` : age).join('')}`,
            nights:   query.get(QUERY_PARAMS.DURATION).get('from'),
            nightsTo: query.get(QUERY_PARAMS.DURATION).get('to'),
        };
        const chart = yield call(getToursGraph, token, params);

        yield put(actions.getPriceChartSuccess(queryId, chart));
    } catch (error) {
        console.error(error);
        yield put(actions.getPriceChartFail(error));
    }
}
