"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeOfferNextPriority = exports.mergeOffer = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var mergeOffer = function mergeOffer(prev, next) {
  return next && _typeof(next) === 'object' && !next[Symbol.iterator] ? _objectSpread({}, prev, {}, next) : next ? next : prev;
};

exports.mergeOffer = mergeOffer;

var mergeOfferNextPriority = function mergeOfferNextPriority(prev, next) {
  return next && _typeof(next) === 'object' && !next[Symbol.iterator] ? _objectSpread({}, prev, {}, next) : next;
};

exports.mergeOfferNextPriority = mergeOfferNextPriority;