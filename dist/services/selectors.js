"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServicesIconsForHotel = exports.getServicesByCountryID = exports.getAllServices = exports.getLabels = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

var _constants = require("./constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var EMPTY_OBJ = {};
var EMPTY_ARRAY = [];

var domain = function domain(_) {
  return _.services;
};

var getLabels = (0, _reselect.createSelector)(domain, R.prop('labels'));
exports.getLabels = getLabels;
var getServicesStore = (0, _reselect.createSelector)(domain, R.prop('store'));
var getAllServices = (0, _reselect.createSelector)(getServicesStore, function (servicesStore) {
  return R.propOr(EMPTY_OBJ, _constants.EMPTY_COUNTRY_ID, servicesStore);
});
exports.getAllServices = getAllServices;
var getServicesByCountryID = (0, _reselect.createSelector)(getServicesStore, function (_, _ref) {
  var countryID = _ref.countryID;
  return countryID;
}, function (servicesStore, countryID) {
  return R.propOr(EMPTY_OBJ, countryID, servicesStore);
});
exports.getServicesByCountryID = getServicesByCountryID;
var getServicesIconsForHotel = (0, _reselect.createSelector)(getServicesByCountryID, R.propOr(EMPTY_ARRAY, 'icons'));
exports.getServicesIconsForHotel = getServicesIconsForHotel;