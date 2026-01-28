"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServicesIconsForHotel = exports.getServicesByCountryID = exports.getLabels = exports.getCommonServicesByCountry = exports.getBookingServicesByOffer = exports.getAllServices = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
var _selectors = require("../auth/selectors");
var _constants = require("./constants");
var _helpers = require("./helpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var EMPTY_OBJ = {};
var EMPTY_ARRAY = [];
var domain = function domain(_) {
  return _.services;
};
var getCommonLabesl = (0, _reselect.createSelector)(domain, R.prop('labels'));
var getLabels = exports.getLabels = (0, _reselect.createSelector)(getCommonLabesl, _selectors.getLang, function (labels, lang) {
  return R.mergeAll([labels, _constants.STATIC_LABELS_BY_LANG[lang] || _constants.STATIC_LABELS_BY_LANG.rus]);
});
var getServicesStore = (0, _reselect.createSelector)(domain, R.prop('store'));
var getAllServices = exports.getAllServices = (0, _reselect.createSelector)(getServicesStore, function (servicesStore) {
  return R.propOr(EMPTY_OBJ, _constants.EMPTY_COUNTRY_ID, servicesStore);
});
var getServicesByCountryID = exports.getServicesByCountryID = (0, _reselect.createSelector)(getServicesStore, function (_, _ref) {
  var countryID = _ref.countryID;
  return countryID;
}, function (servicesStore, countryID) {
  return R.propOr(EMPTY_OBJ, countryID, servicesStore);
});
var getCommonServicesByCountry = exports.getCommonServicesByCountry = (0, _reselect.createSelector)(getServicesByCountryID, function (servicesMap) {
  return R.isEmpty(servicesMap) ? servicesMap : {
    beach: servicesMap.beach,
    main: servicesMap.main,
    sport: servicesMap.sport,
    child: servicesMap.child,
    renovation: servicesMap.renovation
  };
});
var getServicesIconsForHotel = exports.getServicesIconsForHotel = (0, _reselect.createSelector)(getServicesByCountryID, R.propOr(EMPTY_ARRAY, 'icons'));
var getBookingServices = R.pipe(domain, R.prop('booking'));
var getBookingServicesByOffer = exports.getBookingServicesByOffer = (0, _reselect.createSelector)(getBookingServices, function (_, _ref2) {
  var offerID = _ref2.offerID,
    currency = _ref2.currency;
  return (0, _helpers.createBookingServicesKey)(offerID, currency);
}, function (servicesMap, key) {
  return R.propOr(EMPTY_ARRAY, key, servicesMap);
});