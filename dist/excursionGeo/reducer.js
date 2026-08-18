"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _actions = require("./actions");
// Core

const initialState = (0, _immutable.Map)({
  suggests: (0, _immutable.Map)(),
  countries: (0, _immutable.Map)(),
  cities: (0, _immutable.Map)(),
  sights: (0, _immutable.Map)(),
  departures: (0, _immutable.Map)()
});
const reducer = exports.reducer = (0, _reduxActions.handleActions)({
  [_actions.actions.getSuggestsSuccess]: (state, _ref) => {
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
    const convertArrayToKeyedMap = collection => (0, _immutable.List)(collection).toMap().mapKeys((k, _ref2) => {
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
  [_actions.actions.getDepartureCitiesSuccess]: (state, _ref4) => {
    let {
      payload: {
        countryId,
        cities
      }
    } = _ref4;
    return state.setIn(['departures', countryId], cities);
  }
}, initialState);