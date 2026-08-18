import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

// actions
import { operatorsActions as actions } from './actions';
const initialState = Map({
  'rates': {},
  'store': Map(),
  'ui': Map()
});
export const operatorsReducer = handleActions({
  [actions.getOperatorsSuccess]: (state, _ref) => {
    let {
      payload
    } = _ref;
    const {
      countryId,
      operators
    } = payload;
    return state.setIn(['store', countryId], operators);
  },
  [actions.setUiFlag]: (state, _ref2) => {
    let {
      payload
    } = _ref2;
    const {
      path,
      value
    } = payload;
    return state.setIn(['ui', ...path], value);
  },
  [actions.getCurrencyRatesSuccess]: (state, _ref3) => {
    let {
      payload
    } = _ref3;
    const {
      key,
      rates
    } = payload;
    return state.setIn(['rates', key], rates);
  }
}, initialState);