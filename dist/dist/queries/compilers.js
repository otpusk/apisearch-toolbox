"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.immutableArrayCompiler = exports.numberCompiler = exports.toStringCompiler = exports.mapCompiler = exports.arrayCompiler = exports.datesCompiler = exports.rangeCompiler = exports.binaryCompiler = void 0;

var _fn = require("./fn"); // Instruments

/**
 * Compile boolean list
 *
 * @param {Map} value flags list
 * @returns {String} binary param
 */


var binaryCompiler = function binaryCompiler(value) {
  return Number(value.toList().map(function (flag) {
    return Number(flag);
  }).join(_fn.GLUE.binary)).toString(36);
};
/**
 * Range compiler
 *
 * @param {Map} value range
 * @return {String} range param
 */


exports.binaryCompiler = binaryCompiler;

var rangeCompiler = function rangeCompiler(value) {
  var _value$toObject = value.toObject(),
      _value$toObject$from = _value$toObject.from,
      from = _value$toObject$from === void 0 ? '' : _value$toObject$from,
      _value$toObject$to = _value$toObject.to,
      to = _value$toObject$to === void 0 ? '' : _value$toObject$to;

  return (from === to ? [from] : [from, to]).join(_fn.GLUE.range);
};
/**
 * Dates compiler
 *
 * @param {Map} value dates
 * @returns {String} dates param
 */


exports.rangeCompiler = rangeCompiler;

var datesCompiler = function datesCompiler(value) {
  return [value.get('from'), value.get('to')].map(function (date) {
    return date ? date.format('D.M.Y') : _fn.GLUE.empty;
  }).join(_fn.GLUE.range);
};
/**
 * Array compiler
 *
 * @param {Array} value values
 * @returns {String} param
 */


exports.datesCompiler = datesCompiler;

var arrayCompiler = function arrayCompiler(value) {
  return value.length ? value.join(_fn.GLUE.list) : _fn.GLUE.empty;
};
/**
 * Map structure compiler
 *
 * @param {Map} value value
 * @returns {String} map keys
 */


exports.arrayCompiler = arrayCompiler;

var mapCompiler = function mapCompiler(value) {
  return value && value.count() ? value.keySeq().toArray().join(_fn.GLUE.list) : _fn.GLUE.empty;
};
/**
 * toStringCompiler
 *
 * @param {any} value value
 * @returns {String} param
 */


exports.mapCompiler = mapCompiler;

var toStringCompiler = function toStringCompiler(value) {
  return value.toString();
};
/**
 * Number compiler
 *
 * @param {Number} value value
 * @returns {string} param
 */


exports.toStringCompiler = toStringCompiler;

var numberCompiler = function numberCompiler(value) {
  return Number(value).toString();
};
/* Immutable List, Set compiler */


exports.numberCompiler = numberCompiler;

var immutableArrayCompiler = function immutableArrayCompiler(value) {
  return value.size ? value.join(_fn.GLUE.list) : _fn.GLUE.empty;
};

exports.immutableArrayCompiler = immutableArrayCompiler;