"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toStringCompiler = exports.rangeCompiler = exports.numberCompiler = exports.mapCompiler = exports.immutableArrayCompiler = exports.datesCompiler = exports.binaryCompiler = exports.arrayCompiler = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _fn = require("./fn");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Instruments

/**
 * Compile boolean list
 *
 * @param {Map} value flags list
 * @returns {String} binary param
 */
const binaryCompiler = value => Number(value.toList().map(flag => Number(flag)).join(_fn.GLUE.binary)).toString(36);

/**
 * Range compiler
 *
 * @param {Map} value range
 * @return {String} range param
 */
exports.binaryCompiler = binaryCompiler;
const rangeCompiler = value => {
  const {
    from = '',
    to = ''
  } = value.toObject();
  return (from === to ? [from] : [from, to]).join(_fn.GLUE.range);
};

/**
 * Dates compiler
 *
 * @param {Map} value dates
 * @returns {String} dates param
 */
exports.rangeCompiler = rangeCompiler;
const datesCompiler = value => {
  const isSetRangeDateField = value.get(_constants.RANGE_DATE_FIELD) === 'number';
  if (isSetRangeDateField) {
    const range = value.get(_constants.RANGE_DATE_FIELD);
    return [(0, _moment.default)(value.get('from')).add(range, 'days').format('D.M.Y'), `${_constants.RANGE_DATE_TAG}${range}`].join('');
  }
  return [value.get('from'), value.get('to')].map(date => date ? (0, _moment.default)(date).format('D.M.Y') : _fn.GLUE.empty).join(_fn.GLUE.range);
};

/**
 * Array compiler
 *
 * @param {Array} value values
 * @returns {String} param
 */
exports.datesCompiler = datesCompiler;
const arrayCompiler = value => value.length ? value.join(_fn.GLUE.list) : _fn.GLUE.empty;

/**
 * Map structure compiler
 *
 * @param {Map} value value
 * @returns {String} map keys
 */
exports.arrayCompiler = arrayCompiler;
const mapCompiler = value => value && value.count() ? value.keySeq().toArray().join(_fn.GLUE.list) : _fn.GLUE.empty;

/**
 * toStringCompiler
 *
 * @param {any} value value
 * @returns {String} param
 */
exports.mapCompiler = mapCompiler;
const toStringCompiler = value => value.toString();

/**
 * Number compiler
 *
 * @param {Number} value value
 * @returns {string} param
 */
exports.toStringCompiler = toStringCompiler;
const numberCompiler = value => Number(value).toString();

/* Immutable List, Set compiler */
exports.numberCompiler = numberCompiler;
const immutableArrayCompiler = value => value.size ? value.join(_fn.GLUE.list) : _fn.GLUE.empty;
exports.immutableArrayCompiler = immutableArrayCompiler;