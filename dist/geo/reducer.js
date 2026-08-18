"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoReducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _ramda = require("ramda");
var _actions = require("./actions");
// Core

// Instruments

const initalState = (0, _immutable.Map)({
  countries: (0, _immutable.List)(),
  suggestions: {},
  suggestEntities: {
    country: {},
    city: {},
    hotel: {}
  },
  departures: (0, _immutable.Map)(),
  cities: (0, _immutable.Map)(),
  hotels: (0, _immutable.Map)(),
  operators: (0, _immutable.Map)(),
  geoTree: {},
  statuses: (0, _immutable.Map)(),
  flightPorts: {}
});
const geoReducer = exports.geoReducer = (0, _reduxActions.handleActions)({
  [_actions.geoActions.getSuggestsSuccess]: (state, _ref) => {
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
    const toById = (0, _ramda.indexBy)((0, _ramda.prop)('id'));
    return state.setIn(['suggestions', key], {
      country: (0, _ramda.pluck)('id', country),
      city: (0, _ramda.pluck)('id', city),
      hotel: (0, _ramda.pluck)('id', hotel)
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
  [_actions.geoActions.getCountriesSuccess]: (state, _ref2) => {
    let {
      payload: countries
    } = _ref2;
    return state.set('countries', (0, _immutable.List)(countries)).setIn(['statuses', 'countries'], 'loaded');
  },
  [_actions.geoActions.getCountriesFail]: state => {
    return state.setIn(['statuses', 'countries'], 'failed');
  },
  [_actions.geoActions.getDepartureCitiesSuccess]: (state, _ref3) => {
    let {
      payload: {
        key,
        departures
      }
    } = _ref3;
    return state.setIn(['departures', key], (0, _immutable.List)(departures));
  },
  [_actions.geoActions.getCitiesSuccess]: (state, _ref4) => {
    let {
      payload: {
        countryId,
        cities
      }
    } = _ref4;
    return state.setIn(['cities', countryId], (0, _immutable.List)(cities));
  },
  [_actions.geoActions.getHotelsSuccess]: (state, _ref5) => {
    let {
      payload: {
        hotels,
        key
      }
    } = _ref5;
    return state.setIn(['hotels', key], (0, _immutable.List)(hotels));
  },
  [_actions.geoActions.removeHotels]: (state, _ref6) => {
    let {
      payload: key
    } = _ref6;
    return state.removeIn(['hotels', key]);
  },
  [_actions.geoActions.getOperatorsSuccess]: (state, _ref7) => {
    let {
      payload: {
        key,
        operators
      }
    } = _ref7;
    return state.setIn(['operators', key], operators);
  },
  [_actions.geoActions.getGeoTreeSuccess]: (state, _ref8) => {
    let {
      payload: {
        countryId,
        geoTree
      }
    } = _ref8;
    return state.setIn(['geoTree', countryId], geoTree);
  },
  [_actions.geoActions.getLocationDataSuccess]: (state, _ref9) => {
    let {
      payload: {
        id,
        data
      }
    } = _ref9;
    return state.setIn(['locations', id], data);
  },
  [_actions.geoActions.getFlightPortSuccess]: (state, _ref10) => {
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