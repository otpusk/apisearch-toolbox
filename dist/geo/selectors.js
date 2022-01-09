"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopCountry = exports.getOperatorsMap = exports.getOperators = exports.getOperator = exports.getHotelsByCountry = exports.getFlightPorts = exports.getFlightPort = exports.getDepartures = exports.getDepartureByIATA = exports.getCountry = exports.getCountries = exports.getActiveOperators = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var EMPTY_ARRAY = [];

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

var getCountryID = function getCountryID(_, _ref3) {
  var countryID = _ref3.countryID;
  return countryID;
};

var getDeparturesByImmutableStructure = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('departures');
});

var getDepartures = function getDepartures() {
  return (0, _reselect.createSelector)(getDeparturesByImmutableStructure, departureGeoID, function (map, geoID) {
    return R.propOr(EMPTY_ARRAY, geoID, map.toJS());
  });
};

exports.getDepartures = getDepartures;

var getDepartureByIATA = function getDepartureByIATA() {
  return (0, _reselect.createSelector)(getDepartures(), getIATA, function (list, code) {
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
  return (0, _reselect.createSelector)(domain, function (_, _ref4) {
    var key = _ref4.key;
    return key;
  }, function (geo, key) {
    return R.call(R.pipe(function (operators) {
      return operators.toObject();
    }, R.prop(key), R.ifElse(Boolean, function (operators) {
      return operators.toArray();
    }, R.always(EMPTY_ARRAY))), geo.get('operators'));
  });
};

exports.getOperators = getOperators;

var getOperatorsMap = function getOperatorsMap() {
  return (0, _reselect.createSelector)(getOperators(), function (operators) {
    return R.call(R.pipe(R.map(function (operator) {
      return [operator.id, operator];
    }), R.fromPairs), operators);
  });
};

exports.getOperatorsMap = getOperatorsMap;

var getOperator = function getOperator() {
  return (0, _reselect.createSelector)(getOperators(), function (_, _ref5) {
    var operatorID = _ref5.operatorID;
    return operatorID;
  }, function (operatorsArray, findID) {
    return R.find(function (_ref6) {
      var id = _ref6.id;
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
exports.getCountries = getCountries;

var getCountry = function getCountry() {
  return (0, _reselect.createSelector)(getCountries, getCountryID, function (countries, id) {
    return R.find(function (country) {
      return country.id === id;
    }, countries);
  });
};

exports.getCountry = getCountry;
var getTopCountry = (0, _reselect.createSelector)(getCountries, R.pipe(R.sort(R.descend(R.prop('weight'))), R.head));
exports.getTopCountry = getTopCountry;
var getHotelsStore = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('hotels');
});

var getHotelsImmutableStructureByCountry = function getHotelsImmutableStructureByCountry() {
  return (0, _reselect.createSelector)(getHotelsStore, getCountryID, function (store, countryID) {
    return R.prop(countryID, store.toObject());
  });
};

var getHotelsByCountry = function getHotelsByCountry() {
  return (0, _reselect.createSelector)(getHotelsImmutableStructureByCountry(), function (hotels) {
    return hotels ? hotels.toArray() : EMPTY_ARRAY;
  });
};

exports.getHotelsByCountry = getHotelsByCountry;