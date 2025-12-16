"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopCountry = exports.getOperatorsMap = exports.getOperators = exports.getOperator = exports.getHotelsByKey = exports.getHotelsByCountry = exports.getHotelByKey = exports.getHotelByCountry = exports.getFlightPorts = exports.getFlightPort = exports.getDepartures = exports.getDepartureByIATA = exports.getDepartureByDefaultGeo = exports.getCountry = exports.getCountries = exports.getActiveOperators = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var EMPTY_ARRAY = [];
var DEFAULT_DEPARTURE_GEO_ID = 0;
var domain = function domain(_) {
  return _.geo;
};
var departureGeoID = function departureGeoID(_, _ref) {
  var geoID = _ref.geoID;
  return geoID;
};
var getDepartureID = function getDepartureID(_, _ref2) {
  var departureID = _ref2.departureID;
  return departureID;
};
var getIATA = function getIATA(_, _ref3) {
  var iata = _ref3.iata;
  return iata;
};
var getCountryID = function getCountryID(_, _ref4) {
  var countryID = _ref4.countryID;
  return countryID;
};
var getHotelID = function getHotelID(_, _ref5) {
  var hotelID = _ref5.hotelID;
  return hotelID;
};
var getHotelKey = function getHotelKey(_, _ref6) {
  var hotelKey = _ref6.hotelKey;
  return hotelKey;
};
var getDeparturesByImmutableStructure = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('departures');
});
var getDepartures = exports.getDepartures = function getDepartures() {
  return (0, _reselect.createSelector)(getDeparturesByImmutableStructure, departureGeoID, function (map, geoID) {
    return R.propOr(EMPTY_ARRAY, geoID, map.toJS());
  });
};
var getDepartureByDefaultGeo = exports.getDepartureByDefaultGeo = function getDepartureByDefaultGeo() {
  return (0, _reselect.createSelector)(getDeparturesByImmutableStructure, getDepartureID, function (map, id) {
    return R.find(function (departure) {
      return departure.id === id;
    }, R.propOr(EMPTY_ARRAY, DEFAULT_DEPARTURE_GEO_ID, map.toJS()));
  });
};
var getDepartureByIATA = exports.getDepartureByIATA = function getDepartureByIATA() {
  return (0, _reselect.createSelector)(getDepartures(), getIATA, function (list, code) {
    return R.find(R.pipe(R.prop('iata'), R.equals(code)), list);
  });
};
var getFlightPorts = exports.getFlightPorts = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('flightPorts');
});
var getFlightPort = exports.getFlightPort = function getFlightPort() {
  return (0, _reselect.createSelector)(getFlightPorts, getIATA, function (ports, iata) {
    return R.prop(iata, ports);
  });
};
var getOperators = exports.getOperators = function getOperators() {
  return (0, _reselect.createSelector)(domain, function (_, _ref7) {
    var key = _ref7.key;
    return key;
  }, function (geo, key) {
    return R.call(R.pipe(function (operators) {
      return operators.toObject();
    }, R.prop(key), R.ifElse(Boolean, function (operators) {
      return operators.toArray();
    }, R.always(EMPTY_ARRAY))), geo.get('operators'));
  });
};
var getOperatorsMap = exports.getOperatorsMap = function getOperatorsMap() {
  return (0, _reselect.createSelector)(getOperators(), function (operators) {
    return R.call(R.pipe(R.map(function (operator) {
      return [operator.id, operator];
    }), R.fromPairs), operators);
  });
};
var getOperator = exports.getOperator = function getOperator() {
  return (0, _reselect.createSelector)(getOperators(), function (_, _ref8) {
    var operatorID = _ref8.operatorID;
    return operatorID;
  }, function (operatorsArray, findID) {
    return R.find(function (_ref9) {
      var id = _ref9.id;
      return Number(id) === Number(findID);
    }, operatorsArray);
  });
};
var getActiveOperators = exports.getActiveOperators = function getActiveOperators() {
  return (0, _reselect.createSelector)(getOperators(), R.filter(R.prop('active')));
};
var getCountriesByImmutableStructure = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('countries');
});
var getCountries = exports.getCountries = (0, _reselect.createSelector)(getCountriesByImmutableStructure, function (countries) {
  return countries.toArray();
});
var getCountry = exports.getCountry = function getCountry() {
  return (0, _reselect.createSelector)(getCountries, getCountryID, function (countries, id) {
    return R.find(function (country) {
      return country.id === id;
    }, countries);
  });
};
var getTopCountry = exports.getTopCountry = (0, _reselect.createSelector)(getCountries, R.pipe(R.sort(R.descend(R.prop('weight'))), R.head));
var getHotelsStore = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('hotels');
});
var getHotelsImmutableStructureByCountry = function getHotelsImmutableStructureByCountry() {
  return (0, _reselect.createSelector)(getHotelsStore, getCountryID, function (store, countryID) {
    return R.prop(countryID, store.toObject());
  });
};
var getHotelsByCountry = exports.getHotelsByCountry = function getHotelsByCountry() {
  return (0, _reselect.createSelector)(getHotelsImmutableStructureByCountry(), function (hotels) {
    return hotels ? hotels.toArray() : EMPTY_ARRAY;
  });
};
var getHotelByCountry = exports.getHotelByCountry = function getHotelByCountry() {
  return (0, _reselect.createSelector)(getHotelsByCountry(), getHotelID, function (hotels, id) {
    return R.find(function (hotel) {
      return hotel.id === id;
    }, hotels);
  });
};
var getHotelsByKey = exports.getHotelsByKey = function getHotelsByKey() {
  return (0, _reselect.createSelector)(getHotelsStore, getHotelKey, function (hotelsStore, key) {
    return hotelsStore.has(key) ? hotelsStore.get(key).toArray() : EMPTY_ARRAY;
  });
};
var getHotelByKey = exports.getHotelByKey = function getHotelByKey() {
  return (0, _reselect.createSelector)(getHotelsByKey, getHotelID, function (hotels, id) {
    return R.find(function (hotel) {
      return hotel.id === id;
    }, hotels);
  });
};