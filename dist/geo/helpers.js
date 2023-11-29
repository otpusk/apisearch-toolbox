"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateOperatorKey = exports.generateHotelKey = void 0;
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var isFilledRatingObject = function isFilledRatingObject(_ref) {
  var from = _ref.from,
    to = _ref.to;
  return from && to;
};
var generateHotelKey = function generateHotelKey(countryID, rating, services) {
  return R.join('-', R.filter(Boolean, [countryID, services && R.join('|', services), rating && isFilledRatingObject(rating) && "".concat(rating.from, "-").concat(rating.to)]));
};
exports.generateHotelKey = generateHotelKey;
var generateOperatorKey = function generateOperatorKey(countryID, departureID) {
  return R.join('-', R.filter(Number.isFinite, [Number(countryID), Number(departureID)]));
};
exports.generateOperatorKey = generateOperatorKey;