import { Map, List, Set } from 'immutable';
import moment from 'moment';
import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import { queriesActions } from './actions';
import { createQuery, QUERY_PARAMS, parseOSQueryHash, parseQueryString, createSearchQuery } from './fn';
const initalState = Map({});
export const queriesReducer = handleActions({
  [queriesActions.createQuery]: (state, _ref) => {
    let {
      payload: {
        queryId,
        initialParams,
        isUrl
      }
    } = _ref;
    return state.set(queryId, isUrl ? createSearchQuery(initialParams) : createQuery(initialParams));
  },
  [queriesActions.setQuery]: (state, _ref2) => {
    let {
      payload: {
        queryId,
        query
      }
    } = _ref2;
    return state.set(queryId, query);
  },
  [queriesActions.removeQuery]: (state, _ref3) => {
    let {
      payload: queryId
    } = _ref3;
    return state.remove(queryId);
  },
  [queriesActions.createQueryFromOffer]: (state, _ref4) => {
    let {
      payload: {
        queryId,
        hotel,
        offer,
        overrides = {}
      }
    } = _ref4;
    const defaultQuery = createQuery();
    return state.set(queryId, createQuery({
      [QUERY_PARAMS.COUNTRY]: hotel.country.id,
      [QUERY_PARAMS.DEPARTURES]: defaultQuery.get(QUERY_PARAMS.DEPARTURES).push(offer.departure),
      [QUERY_PARAMS.DURATION]: Map({
        from: offer.nights,
        to: offer.nights
      }),
      [QUERY_PARAMS.DATES]: Map({
        from: moment(offer.date),
        to: moment(offer.date)
      }),
      [QUERY_PARAMS.CATEGORY]: defaultQuery.get(QUERY_PARAMS.CATEGORY).map(() => false).merge({
        [hotel.stars]: true
      }),
      [QUERY_PARAMS.ADULTS]: offer.adults,
      [QUERY_PARAMS.CHILDREN]: List(offer.people.children),
      [QUERY_PARAMS.CITIES]: Set([hotel.city.id]),
      [QUERY_PARAMS.HOTELS]: Set([hotel.id]),
      [QUERY_PARAMS.TRANSPORTS]: defaultQuery.get(QUERY_PARAMS.TRANSPORTS).update(0, transportsMap => transportsMap.map(R.F).merge({
        [offer.transport]: true
      })),
      [QUERY_PARAMS.FOOD]: defaultQuery.get(QUERY_PARAMS.FOOD).map(() => false).merge({
        [offer.food]: true
      }),
      [QUERY_PARAMS.CURRENCY]: offer.currency,
      ...overrides
    }));
  },
  [queriesActions.changeQueryParam]: (state, _ref5) => {
    let {
      payload: {
        queryId,
        paramName,
        paramValue
      }
    } = _ref5;
    return state.setIn([queryId, paramName], paramValue);
  },
  [queriesActions.changeQueryParams]: (state, _ref6) => {
    let {
      payload: {
        queryId,
        paramValues
      }
    } = _ref6;
    return state.mergeIn([queryId], paramValues);
  },
  [queriesActions.resetQueryParam]: (state, _ref7) => {
    let {
      payload: {
        queryId,
        paramName
      }
    } = _ref7;
    return state.setIn([queryId, paramName], createQuery().get(paramName));
  },
  [queriesActions.parseOsQueryString]: (state, _ref8) => {
    let {
      payload: {
        targetQueryId,
        queryString
      }
    } = _ref8;
    return state.update(queries => queryString ? queries.set(targetQueryId, parseOSQueryHash(queryString, queries.get(targetQueryId))) : queries);
  },
  [queriesActions.parseQueryString]: (state, _ref9) => {
    let {
      payload: {
        queryId,
        queryString
      }
    } = _ref9;
    return state.update(queries => queryString ? queries.set(queryId, parseQueryString(queryString, queries.get(queryId))) : queries);
  }
}, initalState);