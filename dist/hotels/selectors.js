"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotel = exports.hotelsHub = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Core
var domain = function domain(_) {
  return _.hotels;
};

var hotelKey = function hotelKey(_, key) {
  return key;
};

var hotelsHub = (0, _reselect.createSelector)(domain, R.pipe(function (hub) {
  return hub.get('store');
}, R.ifElse(function (v) {
  return v.isEmpty();
}, function () {
  return {};
}, function (v) {
  return v.toJS();
})));
exports.hotelsHub = hotelsHub;

var getHotel = function getHotel() {
  return (0, _reselect.createSelector)(hotelsHub, hotelKey, function (hub, key) {
    return R.prop(key, hub);
  });
};

exports.getHotel = getHotel;