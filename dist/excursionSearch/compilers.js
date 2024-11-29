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
exports.dateCompiler = void 0;
Object.defineProperty(exports, "numberCompiler", {
  enumerable: true,
  get: function get() {
    return _compilers.numberCompiler;
  }
});
Object.defineProperty(exports, "toStringCompiler", {
  enumerable: true,
  get: function get() {
    return _compilers.toStringCompiler;
  }
});
var _fn = require("./fn");
var _moment = _interopRequireDefault(require("moment"));
var _compilers = require("../queries/compilers");
<<<<<<< HEAD
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
=======
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
>>>>>>> task-45948
// Instruments

/**
 * Date compiler
 *
 * @param {Date} value value
 * @returns {String} param
 */
var dateCompiler = exports.dateCompiler = function dateCompiler(date) {
  return date ? (0, _moment["default"])(date).format("D.M.Y") : _fn.GLUE.empty;
};