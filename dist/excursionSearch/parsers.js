"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStringIntengerToBoolean = exports.numbersArrayParser = exports.arrayParser = exports.dateParser = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _fn = require("./fn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Core
// Instruments

/**
 * Parse date
 *
 * @param {string} value date
 * @returns {Date} date
 */
var dateParser = function dateParser(value) {
  var parsedDate = (0, _moment["default"])(value, 'DD-MM-YYYY');
  return parsedDate.isValid() ? parsedDate : null;
};
/**
 * Array parser
 *
 * @param {string} value string
 * @returns {Array} array
 */


exports.dateParser = dateParser;

var arrayParser = function arrayParser(value) {
  return value ? value.split(_fn.GLUE.list) : [];
};
/**
 * Numbers array parser
 *
 * @param {string} value string
 * @returns{Array} array
 */


exports.arrayParser = arrayParser;

var numbersArrayParser = function numbersArrayParser(value) {
  return arrayParser(value).map(Number);
};
/* parse boolean values that presented as a string */


exports.numbersArrayParser = numbersArrayParser;

var parseStringIntengerToBoolean = function parseStringIntengerToBoolean(value) {
  return Boolean(Number(value));
};

exports.parseStringIntengerToBoolean = parseStringIntengerToBoolean;