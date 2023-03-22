import { Map, Range, Set } from 'immutable';
import moment from 'moment';
import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import { queriesActions } from './actions';
import { createQuery, QUERY_PARAMS, parseOSQueryHash, parseQueryString, createSearchQuery } from './fn';

const initalState = Map({});

export const queriesReducer = handleActions(
    {
        [queriesActions.createQuery]: (state, { payload: { queryId, initialParams, isUrl }}) => {
            return state.set(queryId, isUrl ? createSearchQuery(initialParams) : createQuery(initialParams));
        },
        [queriesActions.setQuery]: (state, { payload: { queryId, query }}) => {
            return state.set(queryId, query);
        },
        [queriesActions.removeQuery]: (state, { payload: queryId }) => {
            return state.remove(queryId);
        },
        [queriesActions.createQueryFromOffer]: (state, { payload: { queryId, hotel, offer, overrides = {}}}) => {
            const defaultQuery = createQuery();

            return state.set(
                queryId,
                createQuery({
                    [QUERY_PARAMS.COUNTRY]:    hotel.country.id,
                    [QUERY_PARAMS.DEPARTURES]: defaultQuery.get(QUERY_PARAMS.DEPARTURES).push(`${offer.departure}`),
                    [QUERY_PARAMS.DURATION]:   Map({
                        from: offer.nights,
                        to:   offer.nights,
                    }),
                    [QUERY_PARAMS.DATES]: Map({
                        from: moment(offer.date),
                        to:   moment(offer.date),
                    }),
                    [QUERY_PARAMS.CATEGORY]: defaultQuery.get(QUERY_PARAMS.CATEGORY).map(() => false).merge({ [hotel.stars]: true }),
                    [QUERY_PARAMS.ADULTS]:   offer.adults,
                    [QUERY_PARAMS.CHILDREN]: Range(0, offer.children)
                        .map(() => offer.childrenAge.replace(/^.*\D(\d+)\D*$/, '$1'))
                        .map(Number).toList(),
                    [QUERY_PARAMS.CITIES]:     Set([hotel.city.id]),
                    [QUERY_PARAMS.HOTELS]:     Set([hotel.id]),
                    [QUERY_PARAMS.TRANSPORTS]: defaultQuery
                        .get(QUERY_PARAMS.TRANSPORTS)
                        .update(0, (transportsMap) => transportsMap.map(R.F).merge({ [offer.transport]: true })),
                    [QUERY_PARAMS.FOOD]:     defaultQuery.get(QUERY_PARAMS.FOOD).map(() => false).merge({ [offer.food]: true }),
                    [QUERY_PARAMS.CURRENCY]: offer.currency,
                    ...overrides,
                })
            );
        },
        [queriesActions.changeQueryParam]: (state, { payload: { queryId, paramName, paramValue }}) => {
            return state.setIn([queryId, paramName], paramValue);
        },
        [queriesActions.changeQueryParams]: (state, { payload: { queryId, paramValues }}) => {
            return state.mergeIn([queryId], paramValues);
        },
        [queriesActions.resetQueryParam]: (state, { payload: { queryId, paramName }}) => {
            return state.setIn([queryId, paramName], createQuery().get(paramName));
        },
        [queriesActions.parseOsQueryString]: (state, { payload: { targetQueryId, queryString }}) => {

            return state.update(
                (queries) => queryString
                    ? queries.set(targetQueryId, parseOSQueryHash(queryString, queries.get(targetQueryId)))
                    : queries
            );
        },
        [queriesActions.parseQueryString]: (state, { payload: { queryId, queryString }}) => {
            return state.update(
                (queries) => queryString
                    ? queries.set(queryId, parseQueryString(queryString, queries.get(queryId)))
                    : queries
            );
        },
    },
    initalState
);
