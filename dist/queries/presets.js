"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailabilitiesByCountry = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _fn = require("./fn");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getAvailabilitiesByCountry = function getAvailabilitiesByCountry(countryID) {
  var _R$always, _R$always2, _R$always3;

  return R.call(R.cond([[function (id) {
    return R.includes(id, ['43', '115']);
  }, R.always((_R$always = {}, _defineProperty(_R$always, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _defineProperty(_R$always, _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes']), _R$always))], [function (id) {
    return R.includes(id, ['92', '13', '114', '135', '10', '134', '34', '54', '79', '42', '33', '152']);
  }, R.always((_R$always2 = {}, _defineProperty(_R$always2, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _defineProperty(_R$always2, _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes']), _R$always2))], [R.T, R.always((_R$always3 = {}, _defineProperty(_R$always3, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _defineProperty(_R$always3, _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes', 'request']), _R$always3))]]), countryID);
};

exports.getAvailabilitiesByCountry = getAvailabilitiesByCountry;