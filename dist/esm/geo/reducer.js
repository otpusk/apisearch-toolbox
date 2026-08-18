// Core
import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';
import { pluck, indexBy, prop } from 'ramda';

// Instruments
import { geoActions } from './actions';
const initalState = Map({
  countries: List(),
  suggestions: {},
  suggestEntities: {
    country: {},
    city: {},
    hotel: {}
  },
  departures: Map(),
  cities: Map(),
  hotels: Map(),
  operators: Map(),
  geoTree: {},
  statuses: Map(),
  flightPorts: {}
});
export const geoReducer = handleActions({
  [geoActions.getSuggestsSuccess]: (state, _ref) => {
    let {
      payload: {
        key,
        suggestions
      }
    } = _ref;
    const {
      country = [],
      city = [],
      hotel = []
    } = suggestions;
    const toById = indexBy(prop('id'));
    return state.setIn(['suggestions', key], {
      country: pluck('id', country),
      city: pluck('id', city),
      hotel: pluck('id', hotel)
    }).updateIn(['suggestEntities', 'country'], existing => ({
      ...existing,
      ...toById(country)
    })).updateIn(['suggestEntities', 'city'], existing => ({
      ...existing,
      ...toById(city)
    })).updateIn(['suggestEntities', 'hotel'], existing => ({
      ...existing,
      ...toById(hotel)
    }));
  },
  [geoActions.getCountriesSuccess]: (state, _ref2) => {
    let {
      payload: countries
    } = _ref2;
    return state.set('countries', List(countries)).setIn(['statuses', 'countries'], 'loaded');
  },
  [geoActions.getCountriesFail]: state => {
    return state.setIn(['statuses', 'countries'], 'failed');
  },
  [geoActions.getDepartureCitiesSuccess]: (state, _ref3) => {
    let {
      payload: {
        key,
        departures
      }
    } = _ref3;
    return state.setIn(['departures', key], List(departures));
  },
  [geoActions.getCitiesSuccess]: (state, _ref4) => {
    let {
      payload: {
        countryId,
        cities
      }
    } = _ref4;
    return state.setIn(['cities', countryId], List(cities));
  },
  [geoActions.getHotelsSuccess]: (state, _ref5) => {
    let {
      payload: {
        hotels,
        key
      }
    } = _ref5;
    return state.setIn(['hotels', key], List(hotels));
  },
  [geoActions.removeHotels]: (state, _ref6) => {
    let {
      payload: key
    } = _ref6;
    return state.removeIn(['hotels', key]);
  },
  [geoActions.getOperatorsSuccess]: (state, _ref7) => {
    let {
      payload: {
        key,
        operators
      }
    } = _ref7;
    return state.setIn(['operators', key], operators);
  },
  [geoActions.getGeoTreeSuccess]: (state, _ref8) => {
    let {
      payload: {
        countryId,
        geoTree
      }
    } = _ref8;
    return state.setIn(['geoTree', countryId], geoTree);
  },
  [geoActions.getLocationDataSuccess]: (state, _ref9) => {
    let {
      payload: {
        id,
        data
      }
    } = _ref9;
    return state.setIn(['locations', id], data);
  },
  [geoActions.getFlightPortSuccess]: (state, _ref10) => {
    let {
      payload
    } = _ref10;
    const {
      key,
      port
    } = payload;
    return state.setIn(['flightPorts', key], port);
  }
}, initalState);