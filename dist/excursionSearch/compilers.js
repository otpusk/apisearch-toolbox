"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "arrayCompiler", {
  enumerable: true,
  get: function get() {
    return _compilers.arrayCompiler;
  }
});
Object.defineProperty(exports, "toStringCompiler", {
  enumerable: true,
  get: function get() {
    return _compilers.toStringCompiler;
  }
});
Object.defineProperty(exports, "numberCompiler", {
  enumerable: true,
  get: function get() {
    return _compilers.numberCompiler;
  }
});
exports.dateCompiler = void 0;

var _fn = require("./fn");

var _compilers = require("../queries/compilers");

// Instruments

/**
 * Date compiler
 *
 * @param {Date} value value
 * @returns {String} param
 */
var dateCompiler = function dateCompiler(date) {
  return date ? date.format("D.M.Y") : _fn.GLUE.empty;
};

exports.dateCompiler = dateCompiler;