// Core
import { handleActions, combineActions } from 'redux-actions';
import { Map } from 'immutable';

// Instruments
import { actions } from './actions';
const initialState = Map({
  statuses: {},
  queries: {},
  results: {},
  operators: {}
});
export const reducer = handleActions({
  [combineActions(actions.createQuery, actions.setQuery)]: (state, _ref) => {
    let {
      payload: {
        queryId,
        query
      }
    } = _ref;
    return state.setIn(['queries', queryId], query);
  },
  [actions.runSearch]: (state, _ref2) => {
    let {
      payload: {
        queryId
      }
    } = _ref2;
    return state.removeIn(['results', queryId]).setIn(['statuses', queryId], 'process');
  },
  [actions.runNextPageSearch]: (state, _ref3) => {
    let {
      payload: {
        queryId
      }
    } = _ref3;
    return state.setIn(['statuses', queryId], 'process');
  },
  [actions.processSearch]: (state, _ref4) => {
    let {
      payload: {
        queryId,
        page,
        tours
      }
    } = _ref4;
    return state.setIn(['results', queryId, page], tours);
  },
  [actions.finishSearch]: (state, _ref5) => {
    let {
      payload: queryId
    } = _ref5;
    return state.setIn(['statuses', queryId], 'success');
  },
  [actions.failSearch]: (state, _ref6) => {
    let {
      payload: queryId
    } = _ref6;
    return state.setIn(['statuses', queryId], 'failed');
  },
  [actions.getSearchCategoriesSuccess]: (state, _ref7) => {
    let {
      payload: {
        key,
        categories
      }
    } = _ref7;
    return state.setIn(['categories', key], categories);
  },
  [actions.getSearchOperatorsSuccess]: (state, _ref8) => {
    let {
      payload: {
        key,
        operators
      }
    } = _ref8;
    return state.setIn(['operators', key], operators);
  },
  [actions.getSearchTransportsSuccess]: (state, _ref9) => {
    let {
      payload: {
        key,
        transports
      }
    } = _ref9;
    return state.setIn(['transports', key], transports);
  },
  [actions.getSearchPricesSuccess]: (state, _ref10) => {
    let {
      payload: {
        key,
        prices
      }
    } = _ref10;
    return state.setIn(['prices', key], prices);
  }
}, initialState);