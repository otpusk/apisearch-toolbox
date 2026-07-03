"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "arrayParser", {
  enumerable: true,
  get: function get() {
    return _parsers.arrayParser;
  }
});
exports.dateParser = void 0;
Object.defineProperty(exports, "numbersArrayParser", {
  enumerable: true,
  get: function get() {
    return _parsers.numbersArrayParser;
  }
});
var _moment = _interopRequireDefault(require("moment"));
var _parsers = require("../queries/parsers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Core

/**
 * Parse date
 *
 * @param {string} value date
 * @returns {Date} date
 */
var dateParser = exports.dateParser = function dateParser(value) {
  var parsedDate = (0, _moment["default"])(value, "DD-MM-YYYY");
  return parsedDate.isValid() ? parsedDate : null;
};