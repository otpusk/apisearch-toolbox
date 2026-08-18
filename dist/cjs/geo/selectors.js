"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopCountry = exports.getTopCountries = exports.getSuggests = exports.getSuggestEntity = exports.getOperatorsMap = exports.getOperators = exports.getOperator = exports.getHotelsByKey = exports.getHotelsByCountry = exports.getHotelByKey = exports.getHotelByCountry = exports.getGeoTreeByCountryId = exports.getFlightPorts = exports.getFlightPort = exports.getDepartures = exports.getDepartureById = exports.getDepartureByIATA = exports.getDepartureByDefaultGeo = exports.getCountry = exports.getCountries = exports.getCitiesStore = exports.getCitiesByCountry = exports.getActiveOperators = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EMPTY_ARRAY = [];
const DEFAULT_DEPARTURE_GEO_ID = 0;
const domain = _ => _.geo;
const departureGeoID = (_, _ref) => {
  let {
    geoID
  } = _ref;
  return geoID;
};
const getDepartureID = (_, _ref2) => {
  let {
    departureID
  } = _ref2;
  return departureID;
};
const getIATA = (_, _ref3) => {
  let {
    iata
  } = _ref3;
  return iata;
};
const getCountryID = (_, _ref4) => {
  let {
    countryID
  } = _ref4;
  return countryID;
};
const getHotelID = (_, _ref5) => {
  let {
    hotelID
  } = _ref5;
  return hotelID;
};
const getHotelKey = (_, _ref6) => {
  let {
    hotelKey
  } = _ref6;
  return hotelKey;
};
const getDeparturesByImmutableStructure = (0, _reselect.createSelector)(domain, geo => geo.get('departures'));
const getDepartures = () => (0, _reselect.createSelector)(getDeparturesByImmutableStructure, departureGeoID, (map, geoID) => R.propOr(EMPTY_ARRAY, geoID, map.toJS()));
exports.getDepartures = getDepartures;
const getDepartureByDefaultGeo = () => (0, _reselect.createSelector)(getDeparturesByImmutableStructure, getDepartureID, (map, id) => R.find(departure => departure.id === id, R.propOr(EMPTY_ARRAY, DEFAULT_DEPARTURE_GEO_ID, map.toJS())));
exports.getDepartureByDefaultGeo = getDepartureByDefaultGeo;
const getDepartureById = () => (0, _reselect.createSelector)(getDepartures(), getDepartureID, (list, id) => R.find(R.pipe(R.prop('id'), R.equals(id)), list));
exports.getDepartureById = getDepartureById;
const getDepartureByIATA = () => (0, _reselect.createSelector)(getDepartures(), getIATA, (list, code) => R.find(R.pipe(R.prop('iata'), R.equals(code)), list));
exports.getDepartureByIATA = getDepartureByIATA;
const getFlightPorts = exports.getFlightPorts = (0, _reselect.createSelector)(domain, geo => geo.get('flightPorts'));
const getFlightPort = () => (0, _reselect.createSelector)(getFlightPorts, getIATA, (ports, iata) => R.prop(iata, ports));
exports.getFlightPort = getFlightPort;
const getOperators = () => (0, _reselect.createSelector)(domain, (_, _ref7) => {
  let {
    key
  } = _ref7;
  return key;
}, (geo, key) => R.call(R.pipe(operators => operators.toObject(), R.prop(key), R.ifElse(Boolean, operators => operators.toArray(), R.always(EMPTY_ARRAY))), geo.get('operators')));
exports.getOperators = getOperators;
const getOperatorsMap = () => (0, _reselect.createSelector)(getOperators(), operators => R.call(R.pipe(R.map(operator => [operator.id, operator]), R.fromPairs), operators));
exports.getOperatorsMap = getOperatorsMap;
const getOperator = () => (0, _reselect.createSelector)(getOperators(), (_, _ref8) => {
  let {
    operatorID
  } = _ref8;
  return operatorID;
}, (operatorsArray, findID) => R.find(_ref9 => {
  let {
    id
  } = _ref9;
  return Number(id) === Number(findID);
}, operatorsArray));
exports.getOperator = getOperator;
const getActiveOperators = () => (0, _reselect.createSelector)(getOperators(), R.filter(R.prop('active')));
exports.getActiveOperators = getActiveOperators;
const getCountriesByImmutableStructure = (0, _reselect.createSelector)(domain, geo => geo.get('countries'));
const getCountries = exports.getCountries = (0, _reselect.createSelector)(getCountriesByImmutableStructure, countries => countries.toArray());
const getTopCountries = exports.getTopCountries = (0, _reselect.createSelector)(getCountries, countries => countries.filter(country => country.weight > 0));
const getCountry = () => (0, _reselect.createSelector)(getCountries, getCountryID, (countries, id) => R.find(country => country.id === id, countries));
exports.getCountry = getCountry;
const getTopCountry = exports.getTopCountry = (0, _reselect.createSelector)(getCountries, R.pipe(R.sort(R.descend(R.prop('weight'))), R.head));
const getCitiesStore = exports.getCitiesStore = (0, _reselect.createSelector)(domain, geo => geo.get('cities').toObject());
const getCitiesByCountry = exports.getCitiesByCountry = (0, _reselect.createSelector)(getCitiesStore, getCountryID, (citiesStore, countryID) => {
  var _R$prop;
  return ((_R$prop = R.prop(countryID, citiesStore)) === null || _R$prop === void 0 ? void 0 : _R$prop.toArray()) ?? EMPTY_ARRAY;
});
const getHotelsStore = (0, _reselect.createSelector)(domain, geo => geo.get('hotels'));
const getHotelsImmutableStructureByCountry = () => (0, _reselect.createSelector)(getHotelsStore, getCountryID, (store, countryID) => R.prop(countryID, store.toObject()));
const getHotelsByCountry = () => (0, _reselect.createSelector)(getHotelsImmutableStructureByCountry(), hotels => hotels ? hotels.toArray() : EMPTY_ARRAY);
exports.getHotelsByCountry = getHotelsByCountry;
const getHotelByCountry = () => (0, _reselect.createSelector)(getHotelsByCountry(), getHotelID, (hotels, id) => R.find(hotel => hotel.id === id, hotels));
exports.getHotelByCountry = getHotelByCountry;
const getHotelsByKey = () => (0, _reselect.createSelector)(getHotelsStore, getHotelKey, (hotelsStore, key) => hotelsStore.has(key) ? hotelsStore.get(key).toArray() : EMPTY_ARRAY);
exports.getHotelsByKey = getHotelsByKey;
const getHotelByKey = () => (0, _reselect.createSelector)(getHotelsByKey, getHotelID, (hotels, id) => R.find(hotel => hotel.id === id, hotels));
exports.getHotelByKey = getHotelByKey;
const getGeoTree = state => domain(state).get('geoTree');
const getGeoTreeByCountryId = (state, _ref10) => {
  let {
    countryID
  } = _ref10;
  return getGeoTree(state)[countryID] || EMPTY_ARRAY;
};
exports.getGeoTreeByCountryId = getGeoTreeByCountryId;
const getSuggestEntities = (0, _reselect.createSelector)(domain, geo => geo.get('suggestEntities'));
const getSuggestionIndex = (state, _ref11) => {
  let {
    key
  } = _ref11;
  return domain(state).getIn(['suggestions', key]);
};
const getSuggests = () => (0, _reselect.createSelector)(getSuggestEntities, getSuggestionIndex, (entities, index) => {
  if (!index) {
    return index;
  }
  const hydrate = type => (index[type] || EMPTY_ARRAY).map(id => entities[type][id]).filter(Boolean);
  return {
    country: hydrate('country'),
    city: hydrate('city'),
    hotel: hydrate('hotel')
  };
});
exports.getSuggests = getSuggests;
const getSuggestEntity = (state, _ref12) => {
  var _getSuggestEntities$t;
  let {
    type,
    id
  } = _ref12;
  return (_getSuggestEntities$t = getSuggestEntities(state)[type]) === null || _getSuggestEntities$t === void 0 ? void 0 : _getSuggestEntities$t[id];
};
exports.getSuggestEntity = getSuggestEntity;