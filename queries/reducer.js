// Core
import { Map, Range } from 'immutable';
import moment from 'moment';
import { handleActions } from 'redux-actions';

// Instruments
import { queriesActions } from './actions';
import { createQuery, QUERY_PARAMS, parseOSQueryHash, parseQueryString  } from './fn';

const initalState = Map({});

export const queriesReducer = handleActions(
    {
        [queriesActions.createQuery]: (state, { payload: { queryId, initialParams }}) => {
            return state.set(queryId, createQuery(initialParams));
        },
        [queriesActions.setQuery]: (state, { payload: { queryId, query }}) => {
            return state.set(queryId, query);
        },
        [queriesActions.createQueryFromOffer]: (state, { payload: { queryId, hotel, offer, overrides = {}}}) => {
            return state.set(
                queryId,
                createQuery({
                    [QUERY_PARAMS.COUNTRY]:   hotel.country.id,
                    [QUERY_PARAMS.DEPARTURE]: offer.departure,
                    [QUERY_PARAMS.DURATION]:  Map({
                        from: offer.days,
                        to:   offer.days,
                    }),
                    [QUERY_PARAMS.DATES]: Map({
                        from: moment(offer.date),
                        to:   moment(offer.date),
                    }),
                    [QUERY_PARAMS.CATEGORY]: Map({}),
                    [QUERY_PARAMS.ADULTS]:   offer.adults,
                    [QUERY_PARAMS.CHILDREN]: state.getIn(
                        ['form', QUERY_PARAMS.CHILDREN],
                        Range(0, offer.children).map(() => offer.childrenAge).toArray()
                    ),
                    [QUERY_PARAMS.HOTELS]:    [hotel.id],
                    [QUERY_PARAMS.TRANSPORT]: Map({ [offer.transport]: true }),
                    [QUERY_PARAMS.FOOD]:      Map({ [offer.food]: true }),
                    ...overrides,
                })
            );
        },
        [queriesActions.changeQueryParam]: (state, { payload: { queryId, paramName, paramValue }}) => {
            return state.setIn([queryId, paramName], paramValue);
        },
        [queriesActions.changeQueryParams]: (state, { payload: { queryId, paramValue }}) => {
            return state.mergeIn([queryId], paramValue);
        },
        [queriesActions.resetQueryParam]: (state, { payload: { queryId, paramName }}) => {
            return state.setIn([queryId, paramName], createQuery().get(paramName));
        },
        [queriesActions.parseOsQueryString]: (state, { payload: { targetQueryId, queryString } }) => {

            return state.update(
                (queries) => queryString
                    ? queries.set(targetQueryId, parseOSQueryHash(queryString, queries.get(targetQueryId)))
                    : queries
            );
        },
        [queriesActions.parseQueryString]: (state, { payload: { targetQueryId, queryString } }) => {
            return state.update(
                (queries) => queryString
                    ? queries.set(targetQueryId, parseQueryString(queryString, queries.get(targetQueryId)))
                    : queries
            );
        }
    },
    initalState
);
