"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectHotelsByCountry = exports.selectCitiesByCountry = exports.selectCountries = exports.getCountries = exports.getActiveOperators = exports.getOperator = exports.getOperators = exports.getFlightPort = exports.getFlightPorts = exports.getDepartureByIATA = exports.departures = void 0;

var _reselect = require("reselect");

var _immutable = require("immutable");

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Core
// defaults
var emptyList = (0, _immutable.List)();
var emptyArray = [];

var domain = function domain(_) {
  return _.geo;
};

var departureGeoID = function departureGeoID(_, _ref) {
  var geoID = _ref.geoID;
  return geoID;
};

var getIATA = function getIATA(_, _ref2) {
  var iata = _ref2.iata;
  return iata;
};

var departureHUB = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('departures');
});

var departures = function departures() {
  return (0, _reselect.createSelector)(departureHUB, departureGeoID, function (map, geoID) {
    return map.get(geoID, emptyList).toArray();
  });
};

exports.departures = departures;

var getDepartureByIATA = function getDepartureByIATA() {
  return (0, _reselect.createSelector)(departures, getIATA, function (list, code) {
    return R.find(R.pipe(R.prop('iata'), R.equals(code)), list);
  });
};

exports.getDepartureByIATA = getDepartureByIATA;
var getFlightPorts = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('flightPorts');
});
exports.getFlightPorts = getFlightPorts;

var getFlightPort = function getFlightPort() {
  return (0, _reselect.createSelector)(getFlightPorts, getIATA, function (ports, iata) {
    return R.prop(iata, ports);
  });
};

exports.getFlightPort = getFlightPort;

var getOperators = function getOperators() {
  return (0, _reselect.createSelector)(domain, function (_, _ref3) {
    var key = _ref3.key;
    return key;
  }, function (geo, key) {
    return R.call(R.pipe(function (operators) {
      return operators.toObject();
    }, R.prop(key), R.ifElse(Boolean, function (operators) {
      return operators.toArray();
    }, R.always(emptyArray))), geo.get('operators'));
  });
};

exports.getOperators = getOperators;

var getOperator = function getOperator() {
  return (0, _reselect.createSelector)(getOperators(), function (_, _ref4) {
    var operatorID = _ref4.operatorID;
    return operatorID;
  }, function (operatorsArray, findID) {
    return R.find(function (_ref5) {
      var id = _ref5.id;
      return Number(id) === Number(findID);
    }, operatorsArray);
  });
};

exports.getOperator = getOperator;

var getActiveOperators = function getActiveOperators() {
  return (0, _reselect.createSelector)(getOperators(), R.filter(R.prop('active')));
};

exports.getActiveOperators = getActiveOperators;
var getCountriesByImmutableStructure = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('countries');
});
var getCountries = (0, _reselect.createSelector)(getCountriesByImmutableStructure, function (countries) {
  return countries.toArray();
});
/**
 * Select countries from locations store
 */

exports.getCountries = getCountries;
var selectCountries = (0, _reselect.createSelector)(function (state) {
  return state.getIn(['keys', 'countries'], (0, _immutable.List)());
}, function (state) {
  return state.get('locations');
}, function (keys, locations) {
  return locations.filter(function (location, id) {
    return keys.includes(id);
  });
});
/**
 * Select cities by country
 */

exports.selectCountries = selectCountries;
var selectCitiesByCountry = (0, _reselect.createSelector)(function (state, country) {
  return state.getIn(['keys', 'cities', _immutable.Map.isMap(country) ? country.get('id') : country], (0, _immutable.List)());
}, function (state) {
  return state.getIn(['locations', 'cities']);
}, function (keys, locations) {
  return locations.filter(function (location, id) {
    return keys.includes(id);
  });
});
/**
 * Selecte hotels by country
 */

exports.selectCitiesByCountry = selectCitiesByCountry;
var selectHotelsByCountry = (0, _reselect.createSelector)(function (state, country) {
  return state.getIn(['keys', 'hotels', _immutable.Map.isMap(country) ? country.get('id') : country], (0, _immutable.List)());
}, function (state) {
  return state.getIn(['locations', 'hotels']);
}, function (keys, locations) {
  return locations.filter(function (location, id) {
    return keys.includes(id);
  });
});
exports.selectHotelsByCountry = selectHotelsByCountry;