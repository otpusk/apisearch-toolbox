"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServicesIconsForHotel = exports.getServicesByCountryID = exports.getLabels = exports.getCommonServicesByCountry = exports.getChains = exports.getBookingServicesByOffer = exports.getAllServices = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
var _selectors = require("../auth/selectors");
var _constants = require("./constants");
var _helpers = require("./helpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];
const domain = _ => _.services;
const getCommonLabesl = (0, _reselect.createSelector)(domain, R.prop('labels'));
const getLabels = exports.getLabels = (0, _reselect.createSelector)(getCommonLabesl, _selectors.getLang, (labels, lang) => R.mergeAll([labels, _constants.STATIC_LABELS_BY_LANG[lang] || _constants.STATIC_LABELS_BY_LANG.rus]));
const getServicesStore = (0, _reselect.createSelector)(domain, R.prop('store'));
const getAllServices = exports.getAllServices = (0, _reselect.createSelector)(getServicesStore, servicesStore => R.propOr(EMPTY_OBJ, _constants.EMPTY_COUNTRY_ID, servicesStore));
const getServicesByCountryID = exports.getServicesByCountryID = (0, _reselect.createSelector)(getServicesStore, (_, _ref) => {
  let {
    countryID
  } = _ref;
  return countryID;
}, (servicesStore, countryID) => R.propOr(EMPTY_OBJ, countryID, servicesStore));
const getCommonServicesByCountry = exports.getCommonServicesByCountry = (0, _reselect.createSelector)(getServicesByCountryID, servicesMap => R.isEmpty(servicesMap) ? servicesMap : {
  beach: servicesMap.beach,
  main: servicesMap.main,
  sport: servicesMap.sport,
  child: servicesMap.child,
  renovation: servicesMap.renovation
});
const getServicesIconsForHotel = exports.getServicesIconsForHotel = (0, _reselect.createSelector)(getServicesByCountryID, R.propOr(EMPTY_ARRAY, 'icons'));
const getChains = (state, params) => R.propOr(EMPTY_ARRAY, 'chains', getServicesByCountryID(state, params));
exports.getChains = getChains;
const getBookingServices = R.pipe(domain, R.prop('booking'));
const getBookingServicesByOffer = exports.getBookingServicesByOffer = (0, _reselect.createSelector)(getBookingServices, (_, _ref2) => {
  let {
    offerID,
    currency
  } = _ref2;
  return (0, _helpers.createBookingServicesKey)(offerID, currency);
}, (servicesMap, key) => R.propOr(EMPTY_ARRAY, key, servicesMap));