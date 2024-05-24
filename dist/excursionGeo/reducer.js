"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _actions = require("./actions");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
var initialState = (0, _immutable.Map)({
  suggests: (0, _immutable.Map)(),
  countries: (0, _immutable.Map)(),
  cities: (0, _immutable.Map)(),
  sights: (0, _immutable.Map)(),
  departures: (0, _immutable.Map)()
});
var reducer = exports.reducer = (0, _reduxActions.handleActions)(_defineProperty(_defineProperty({}, _actions.actions.getSuggestsSuccess, function (state, _ref) {
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
}), _actions.actions.getDepartureCitiesSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
    countryId = _ref4$payload.countryId,
    cities = _ref4$payload.cities;
  return state.setIn(['departures', countryId], cities);
}), initialState);