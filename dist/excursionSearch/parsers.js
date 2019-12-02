"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "numbersArrayParser", {
  enumerable: true,
  get: function get() {
    return _parsers.numbersArrayParser;
  }
});
Object.defineProperty(exports, "arrayParser", {
  enumerable: true,
  get: function get() {
    return _parsers.arrayParser;
  }
});
exports.dateParser = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _parsers = require("../queries/parsers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Core

/**
 * Parse date
 *
 * @param {string} value date
 * @returns {Date} date
 */
var dateParser = function dateParser(value) {
  var parsedDate = (0, _moment["default"])(value, "DD-MM-YYYY");
  return parsedDate.isValid() ? parsedDate : null;
};

exports.dateParser = dateParser;