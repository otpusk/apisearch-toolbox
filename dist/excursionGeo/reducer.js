"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _handleActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)({
  suggests: (0, _immutable.Map)(),
  countries: (0, _immutable.Map)(),
  cities: (0, _immutable.Map)(),
  sights: (0, _immutable.Map)(),
  departures: (0, _immutable.Map)()
});
var reducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.actions.getSuggestsSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
      key = _ref$payload.key,
      suggestions = _ref$payload.suggestions;
  var _suggestions$countrie = suggestions.countries,
      countries = _suggestions$countrie === void 0 ? [] : _suggestions$countrie,
      _suggestions$cities = suggestions.cities,
      cities = _suggestions$cities === void 0 ? [] : _suggestions$cities,
      _suggestions$sights = suggestions.sights,
      sights = _suggestions$sights === void 0 ? [] : _suggestions$sights;

  var convertArrayToKeyedMap = function convertArrayToKeyedMap(collection) {
    return (0, _immutable.List)(collection).toMap().mapKeys(function (k, _ref2) {
      var id = _ref2.id;
      return id;
    });
  };

  var extractKeys = function extractKeys(collection) {
    return collection.map(function (_ref3) {
      var id = _ref3.id;
      return id;
    });
  };

  return state.setIn(['suggests', key], {
    countries: extractKeys(countries),
    cities: extractKeys(cities),
    sights: extractKeys(sights)
  }).mergeIn(['countries'], convertArrayToKeyedMap(countries)).mergeIn(['cities'], convertArrayToKeyedMap(cities)).mergeIn(['sights'], convertArrayToKeyedMap(sights));
}), _defineProperty(_handleActions, _actions.actions.getDepartureCitiesSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      countryId = _ref4$payload.countryId,
      cities = _ref4$payload.cities;
  return state.setIn(['departures', countryId], cities);
}), _handleActions), initialState);
exports.reducer = reducer;