// Core
import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';
const initialState = Map({
  suggests: Map(),
  countries: Map(),
  cities: Map(),
  sights: Map(),
  departures: Map()
});
export const reducer = handleActions({
  [actions.getSuggestsSuccess]: (state, _ref) => {
    let {
      payload: {
        key,
        suggestions
      }
    } = _ref;
    const {
      countries = [],
      cities = [],
      sights = []
    } = suggestions;
    const convertArrayToKeyedMap = collection => List(collection).toMap().mapKeys((k, _ref2) => {
      let {
        id
      } = _ref2;
      return id;
    });
    const extractKeys = collection => collection.map(_ref3 => {
      let {
        id
      } = _ref3;
      return id;
    });
    return state.setIn(['suggests', key], {
      countries: extractKeys(countries),
      cities: extractKeys(cities),
      sights: extractKeys(sights)
    }).mergeIn(['countries'], convertArrayToKeyedMap(countries)).mergeIn(['cities'], convertArrayToKeyedMap(cities)).mergeIn(['sights'], convertArrayToKeyedMap(sights));
  },
  [actions.getDepartureCitiesSuccess]: (state, _ref4) => {
    let {
      payload: {
        countryId,
        cities
      }
    } = _ref4;
    return state.setIn(['departures', countryId], cities);
  }
}, initialState);