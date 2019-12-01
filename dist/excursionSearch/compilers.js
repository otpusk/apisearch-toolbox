"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberCompiler = exports.toStringCompiler = exports.arrayCompiler = exports.dateCompiler = void 0;

var _fn = require("./fn");

// Instruments

/**
 * Date compiler
 *
 * @param {Date} value value
 * @returns {String} param
 */
var dateCompiler = function dateCompiler(date) {
  return date ? date.format('D.M.Y') : _fn.GLUE.empty;
};
/**
 * Array compiler
 *
 * @param {Array} value values
 * @returns {String} param
 */


exports.dateCompiler = dateCompiler;

var arrayCompiler = function arrayCompiler(value) {
  return value.length ? value.join(_fn.GLUE.list) : _fn.GLUE.empty;
};
/**
 * toStringCompiler
 *
 * @param {any} value value
 * @returns {String} param
 */


exports.arrayCompiler = arrayCompiler;

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

exports.numberCompiler = numberCompiler;