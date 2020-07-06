"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countryParser = exports.createImmutableNumbersArrayParser = exports.createImmutableArrayParser = exports.parseStringIntengerToBoolean = exports.geoParser = exports.numbersArrayParser = exports.arrayParser = exports.datesParser = exports.rangeParser = exports.binaryParser = void 0;

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

var _fn = require("./fn");

var _jsonApi = require("@otpusk/json-api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Parse binary string
 *
 * @param {string} value flags
 * @param {Object} options options
 * @returns {Map} flags list
 */
var binaryParser = function binaryParser(value, _ref) {
  var _List;

  var prevValue = _ref.prevValue;
  var binaryValue = parseInt(value, 36).toString().split('').map(function (flag) {
    return Number(flag) === 1;
  });

  var newValues = (_List = (0, _immutable.List)(binaryValue)).unshift.apply(_List, _toConsumableArray(Array(prevValue.count() - binaryValue.length).fill(false)));

  return prevValue.mapEntries(function (_ref2, index) {
    var _ref3 = _slicedToArray(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];

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

var rangeParser = function rangeParser(value) {
  var valuesArray = value.split(_fn.GLUE.range);
  var isEqualValues = valuesArray.length === 1; // methods

  var mapperValue = function mapperValue(v) {
    return !isNaN(parseInt(v, 10)) ? Number(v) : null;
  };

  if (isEqualValues) {
    var _valuesArray$map = valuesArray.map(mapperValue),
        _valuesArray$map2 = _slicedToArray(_valuesArray$map, 1),
        val = _valuesArray$map2[0];

    return (0, _immutable.Map)({
      'from': val,
      'to': val
    });
  }

  var _valuesArray$map3 = valuesArray.map(mapperValue),
      _valuesArray$map4 = _slicedToArray(_valuesArray$map3, 2),
      from = _valuesArray$map4[0],
      to = _valuesArray$map4[1];

  return (0, _immutable.Map)({
    from: from,
    to: to
  });
};
/**
 * Parse dates
 *
 * @param {string} value dates range
 * @returns {Map} dates
 */


exports.rangeParser = rangeParser;

var datesParser = function datesParser(value) {
  var _value$split$map$map = value.split(_fn.GLUE.range).map(function (str) {
    return (0, _moment["default"])(str, 'DD-MM-YYYY').locale('ru');
  }).map(function (date) {
    return date.isValid() ? date : null;
  }),
      _value$split$map$map2 = _slicedToArray(_value$split$map$map, 2),
      from = _value$split$map$map2[0],
      to = _value$split$map$map2[1];

  return (0, _immutable.Map)({
    from: from,
    to: to
  });
};
/**
 * Array parser
 *
 * @param {string} value string
 * @returns {Array} array
 */


exports.datesParser = datesParser;

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
/**
 * Parse geo
 *
 * @param {Number} value geoId
 * @param {Object} token apitoken
 * @returns {Map} location
 */


exports.numbersArrayParser = numbersArrayParser;

var geoParser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value, _ref4) {
    var token, location;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = _ref4.token;
            _context.next = 3;
            return (0, _jsonApi.getToursGeoById)(token, value);

          case 3:
            location = _context.sent;
            return _context.abrupt("return", location);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function geoParser(_x, _x2) {
    return _ref5.apply(this, arguments);
  };
}();
/* parse boolean values that presented as a string */


exports.geoParser = geoParser;

var parseStringIntengerToBoolean = function parseStringIntengerToBoolean(value) {
  return Boolean(Number(value));
};
/* immutable List, Set parser */


exports.parseStringIntengerToBoolean = parseStringIntengerToBoolean;

var createImmutableArrayParser = function createImmutableArrayParser(baseValueCreator) {
  return function (value) {
    return value ? baseValueCreator(value.split(_fn.GLUE.list)) : baseValueCreator();
  };
};

exports.createImmutableArrayParser = createImmutableArrayParser;

var createImmutableNumbersArrayParser = function createImmutableNumbersArrayParser(baseValueCreator) {
  return function (value) {
    return createImmutableArrayParser(baseValueCreator)(value).map(Number);
  };
};

exports.createImmutableNumbersArrayParser = createImmutableNumbersArrayParser;

var countryParser = function countryParser(value) {};

exports.countryParser = countryParser;