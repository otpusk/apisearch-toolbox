"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rangeParser = exports.parseStringIntengerToBoolean = exports.numbersArrayParser = exports.geoParser = exports.datesParser = exports.createImmutableNumbersArrayParser = exports.createImmutableArrayParser = exports.binaryParser = exports.arrayParser = void 0;
var _immutable = require("immutable");
var _moment = _interopRequireDefault(require("moment"));
var _jsonApi = require("@otpusk/json-api");
var _constants = require("./constants");
var _fn = require("./fn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Core

// Instruments

/**
 * Parse binary string
 *
 * @param {string} value flags
 * @param {Object} options options
 * @returns {Map} flags list
 */
const binaryParser = (value, _ref) => {
  let {
    prevValue
  } = _ref;
  const binaryValue = parseInt(value, 36).toString().split('').map(flag => Number(flag) === 1);
  const newValues = (0, _immutable.List)(binaryValue).unshift(...Array(prevValue.count() - binaryValue.length).fill(false));
  return prevValue.mapEntries((_ref2, index) => {
    let [k, v] = _ref2;
    return [k, newValues.has(index) ? newValues.get(index) : v];
  });
};

/**
 * Parse range value
 *
 * @param {string} value range
 * @returns {Map} range
 */
exports.binaryParser = binaryParser;
const rangeParser = value => {
  const valuesArray = value.split(_fn.GLUE.range);
  const isEqualValues = valuesArray.length === 1;

  // methods
  const mapperValue = v => !isNaN(parseInt(v, 10)) ? Number(v) : null;
  if (isEqualValues) {
    const [val] = valuesArray.map(mapperValue);
    return (0, _immutable.Map)({
      'from': val,
      'to': val
    });
  }
  const [from, to] = valuesArray.map(mapperValue);
  return (0, _immutable.Map)({
    from,
    to
  });
};

/**
 * Parse dates
 *
 * @param {string} value dates range
 * @returns {Map} dates
 */
exports.rangeParser = rangeParser;
const datesParser = value => {
  if (value.includes(encodeURIComponent(_constants.RANGE_DATE_TAG))) {
    const [mediana, range] = value.split(encodeURIComponent(_constants.RANGE_DATE_TAG));
    return (0, _immutable.Map)({
      from: (0, _moment.default)(mediana, 'DD.MM.YYYY').startOf('day').subtract(Number(range), 'days'),
      to: (0, _moment.default)(mediana, 'DD.MM.YYYY').startOf('day').add(Number(range), 'days'),
      [_constants.RANGE_DATE_FIELD]: range
    });
  }
  const [from, to] = value.split(_fn.GLUE.range).map(str => (0, _moment.default)(str, 'DD-MM-YYYY')).map(date => date.isValid() ? date : null);
  return (0, _immutable.Map)({
    from,
    to
  });
};

/**
 * Array parser
 *
 * @param {string} value string
 * @returns {Array} array
 */
exports.datesParser = datesParser;
const arrayParser = value => value ? value.split(_fn.GLUE.list) : [];

/**
 * Numbers array parser
 *
 * @param {string} value string
 * @returns{Array} array
 */
exports.arrayParser = arrayParser;
const numbersArrayParser = value => arrayParser(value).map(Number);

/**
 * Parse geo
 *
 * @param {Number} value geoId
 * @param {Object} token apitoken
 * @returns {Map} location
 */
exports.numbersArrayParser = numbersArrayParser;
const geoParser = async (value, _ref3) => {
  let {
    token
  } = _ref3;
  const location = await (0, _jsonApi.getToursGeoById)(token, value);
  return location;
};

/* parse boolean values that presented as a string */
exports.geoParser = geoParser;
const parseStringIntengerToBoolean = value => Boolean(Number(value));

/* immutable List, Set parser */
exports.parseStringIntengerToBoolean = parseStringIntengerToBoolean;
const createImmutableArrayParser = baseValueCreator => value => value ? baseValueCreator(value.split(_fn.GLUE.list)) : baseValueCreator();
exports.createImmutableArrayParser = createImmutableArrayParser;
const createImmutableNumbersArrayParser = baseValueCreator => value => createImmutableArrayParser(baseValueCreator)(value).map(Number);
exports.createImmutableNumbersArrayParser = createImmutableNumbersArrayParser;