// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { actions } from './actions';
const initialState = Map();
export const reducer = handleActions({
  [actions.getMainpageSuccess]: (state, _ref) => {
    let {
      payload: categories
    } = _ref;
    return state.set('mainpage', categories);
  },
  [actions.getMainpageFail]: state => {
    return state.set('mainpage', []);
  },
  [actions.getCountriesSuccess]: (state, _ref2) => {
    let {
      payload: countries
    } = _ref2;
    return state.set('countries', countries);
  },
  [actions.getCountriesFail]: state => {
    return state.set('countries', []);
  }
}, initialState);