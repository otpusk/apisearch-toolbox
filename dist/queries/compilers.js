"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toStringCompiler = exports.rangeCompiler = exports.numberCompiler = exports.mapCompiler = exports.immutableArrayCompiler = exports.datesCompiler = exports.binaryCompiler = exports.arrayCompiler = void 0;
var _fn = require("./fn");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Instruments

/**
 * Compile boolean list
 *
 * @param {Map} value flags list
 * @returns {String} binary param
 */
var binaryCompiler = exports.binaryCompiler = function binaryCompiler(value) {
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
var rangeCompiler = exports.rangeCompiler = function rangeCompiler(value) {
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
var datesCompiler = exports.datesCompiler = function datesCompiler(value) {
  return [value.get('from'), value.get('to')].map(function (date) {
    return date ? (0, _moment["default"])(date).format('D.M.Y') : _fn.GLUE.empty;
  }).join(_fn.GLUE.range);
};

/**
 * Array compiler
 *
 * @param {Array} value values
 * @returns {String} param
 */
var arrayCompiler = exports.arrayCompiler = function arrayCompiler(value) {
  return value.length ? value.join(_fn.GLUE.list) : _fn.GLUE.empty;
};

/**
 * Map structure compiler
 *
 * @param {Map} value value
 * @returns {String} map keys
 */
var mapCompiler = exports.mapCompiler = function mapCompiler(value) {
  return value && value.count() ? value.keySeq().toArray().join(_fn.GLUE.list) : _fn.GLUE.empty;
};

/**
 * toStringCompiler
 *
 * @param {any} value value
 * @returns {String} param
 */
var toStringCompiler = exports.toStringCompiler = function toStringCompiler(value) {
  return value.toString();
};

/**
 * Number compiler
 *
 * @param {Number} value value
 * @returns {string} param
 */
var numberCompiler = exports.numberCompiler = function numberCompiler(value) {
  return Number(value).toString();
};

/* Immutable List, Set compiler */

var immutableArrayCompiler = exports.immutableArrayCompiler = function immutableArrayCompiler(value) {
  return value.size ? value.join(_fn.GLUE.list) : _fn.GLUE.empty;
};