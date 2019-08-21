"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQuery = createQuery;
exports.createResultBones = createResultBones;
exports.compileQuery = compileQuery;
exports.convertToOtpQuery = convertToOtpQuery;
exports.parseOSQueryHash = parseOSQueryHash;
exports.parseQueryString = parseQueryString;
exports.GLUE = exports.QUERY_PARAMS = void 0;

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

var _compilers = require("./compilers");

var _parsers = require("./parsers");

var _DEFAULTS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Query params names
 */
var QUERY_PARAMS = {
  AUTOSTART: 'autostart',
  DEPARTURE: 'departure',
  COUNTRY: 'country',
  CITIES: 'cities',
  HOTELS: 'hotels',
  CATEGORY: 'category',
  DATES: 'dates',
  DURATION: 'duration',
  ADULTS: 'adults',
  CHILDREN: 'children',
  FOOD: 'food',
  TRANSPORT: 'transport',
  PRICE: 'price',
  PAGE: 'page',
  SERVICES: 'services',
  SHORT: 'short',
  RATING: 'rating',
  CURRENCY: 'currency',
  OPERATORS: 'operators',
  FLIGHT_AVAILABILITY: 'flightAvailability',
  HOTEL_AVAILABILITY: 'hotelAvailability',
  WITHOUT_SPO: 'withoutSPO',
  LANGUAGE: 'language'
};
/**
 * Query defaults
 */

exports.QUERY_PARAMS = QUERY_PARAMS;
var DEFAULTS = (_DEFAULTS = {}, _defineProperty(_DEFAULTS, QUERY_PARAMS.AUTOSTART, false), _defineProperty(_DEFAULTS, QUERY_PARAMS.DEPARTURE, '1544'), _defineProperty(_DEFAULTS, QUERY_PARAMS.COUNTRY, null), _defineProperty(_DEFAULTS, QUERY_PARAMS.CATEGORY, (0, _immutable.Map)({
  2: true,
  3: true,
  4: true,
  5: true
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.DATES, (0, _immutable.Map)({
  from: (0, _moment["default"])().locale('ru').add(7, 'days'),
  to: (0, _moment["default"])().locale('ru').add(14, 'days')
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.DURATION, (0, _immutable.Map)({
  from: 7,
  to: 9
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.ADULTS, 2), _defineProperty(_DEFAULTS, QUERY_PARAMS.CHILDREN, (0, _immutable.List)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.FOOD, (0, _immutable.Map)({
  'uai': true,
  'ai': true,
  'fb': true,
  'hb': true,
  'bb': true,
  'ob': true
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.TRANSPORT, (0, _immutable.Map)({
  'air': true,
  'bus': true,
  'train': true,
  'ship': true,
  'no': false
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.CITIES, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.HOTELS, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.PRICE, (0, _immutable.Map)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.PAGE, 1), _defineProperty(_DEFAULTS, QUERY_PARAMS.SERVICES, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.SHORT, null), _defineProperty(_DEFAULTS, QUERY_PARAMS.RATING, (0, _immutable.Map)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.CURRENCY, null), _defineProperty(_DEFAULTS, QUERY_PARAMS.OPERATORS, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.FLIGHT_AVAILABILITY, (0, _immutable.Set)(['yes', 'request'])), _defineProperty(_DEFAULTS, QUERY_PARAMS.HOTEL_AVAILABILITY, (0, _immutable.Set)(['yes', 'request'])), _defineProperty(_DEFAULTS, QUERY_PARAMS.WITHOUT_SPO, false), _defineProperty(_DEFAULTS, QUERY_PARAMS.LANGUAGE, null), _DEFAULTS);
/**
 * Query string glue
 */

var GLUE = {
  field: '/',
  range: '-',
  list: ',',
  binary: '',
  empty: '!'
};
/**
 * Create query with params from defautls
 *
 * @param {Map} params preset params
 * @returns {OrderedMap} query
 */

exports.GLUE = GLUE;

function createQuery() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new _immutable.OrderedMap(_objectSpread({}, DEFAULTS)).merge(params);
}
/**
 * Create search result bones
 * @returns {Map} result
 */


function createResultBones() {
  return new _immutable.Map({
    country: null,
    hotels: (0, _immutable.Map)(),
    operators: null,
    meta: null,
    chart: null,
    status: null,
    total: 0
  });
}
/**
 * Compile query to string
 *
 * @param {OrderedMap} query query
 * @returns {string} query string
 */


function compileQuery(query) {
  var _fieldsToCompilers;

  var fieldsToCompilers = (_fieldsToCompilers = {}, _defineProperty(_fieldsToCompilers, QUERY_PARAMS.AUTOSTART, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DEPARTURE, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.COUNTRY, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.CITIES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.HOTELS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.CATEGORY, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DATES, _compilers.datesCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DURATION, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.ADULTS, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.CHILDREN, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.FOOD, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.TRANSPORT, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.PRICE, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.SERVICES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.RATING, _compilers.rangeCompiler), _fieldsToCompilers);
  return GLUE.field + query.map(function (value, field) {
    return value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty;
  }).toList().join(GLUE.field).replace(new RegExp("[".concat(GLUE.field).concat(GLUE.empty, "]+$")), '');
}
/**
 * Compile query to string
 *
 * @param {OrderedMap} query query
 * @returns {Object} otp query
 */


function convertToOtpQuery(query) {
  var _converters;

  var converters = (_converters = {}, _defineProperty(_converters, QUERY_PARAMS.DEPARTURE, function (value) {
    return {
      'deptCity': value
    };
  }), _defineProperty(_converters, QUERY_PARAMS.COUNTRY, function (value) {
    return {
      'to': value
    };
  }), _defineProperty(_converters, QUERY_PARAMS.CATEGORY, function (value) {
    return {
      'stars': value.filter(function (status) {
        return status;
      }).keySeq().toList().join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.DATES, function (value) {
    return {
      'checkIn': value.get('from').format('Y-MM-DD'),
      'checkTo': value.get('to').format('Y-MM-DD')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.DURATION, function (value) {
    return {
      'length': value.get('from'),
      'lengthTo': value.get('to')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.ADULTS, function (value) {
    return {
      'people': value
    };
  }), _defineProperty(_converters, QUERY_PARAMS.CHILDREN, function (value) {
    return {
      'people': value.map(function (age) {
        return typeof age === 'string' ? age.replace(/\D.+/, '') : age;
      }).map(String).map(function (age) {
        return age.length === 1 ? "0".concat(age) : age;
      }).join('')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.FOOD, function (value) {
    return {
      'food': value.filter(function (status) {
        return status;
      }).keySeq().toList().join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.TRANSPORT, function (value) {
    return {
      'transport': value.filter(function (status) {
        return status;
      }).keySeq().toList().join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.CITIES, function (value) {
    return {
      'toCities': value.join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.HOTELS, function (value) {
    return {
      'toHotels': value.join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.PRICE, function (value) {
    return {
      'price': value.get('from'),
      'priceTo': value.get('to')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.PAGE, function (value) {
    return {
      'page': value
    };
  }), _defineProperty(_converters, QUERY_PARAMS.SERVICES, function (value) {
    return {
      'services': value.join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.SHORT, function (value) {
    return {
      'short': value
    };
  }), _defineProperty(_converters, QUERY_PARAMS.RATING, function (value) {
    return {
      'rate': value.isEmpty() ? null : "".concat(value.get('from'), "-").concat(value.get('to'))
    };
  }), _defineProperty(_converters, QUERY_PARAMS.CURRENCY, function (value) {
    return {
      'currency': value
    };
  }), _defineProperty(_converters, QUERY_PARAMS.OPERATORS, function (value) {
    return {
      'toOperators': value.toArray()
    };
  }), _defineProperty(_converters, QUERY_PARAMS.FLIGHT_AVAILABILITY, function (value) {
    return {
      'availableFlight': value.toArray()
    };
  }), _defineProperty(_converters, QUERY_PARAMS.HOTEL_AVAILABILITY, function (value) {
    return {
      'stopSale': value.toArray()
    };
  }), _defineProperty(_converters, QUERY_PARAMS.WITHOUT_SPO, function (value) {
    return {
      'noPromo': value
    };
  }), _defineProperty(_converters, QUERY_PARAMS.LANGUAGE, function (value) {
    return {
      'lang': value
    };
  }), _converters);
  return query.filter(function (value, param) {
    return param in converters;
  }).map(function (value, param) {
    return value ? converters[param](value) : {};
  }).reduce(function (summary, values) {
    for (var _i = 0, _Object$entries = Object.entries(values); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          param = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      value && Object.assign(summary, _defineProperty({}, param, param in summary ? summary[param] + value : value));
    }

    return summary;
  }, {});
}

function parseQueryParam(currentValue, paramName, rawValue) {
  var _paramsToParsers;

  var paramsToParsers = (_paramsToParsers = {}, _defineProperty(_paramsToParsers, QUERY_PARAMS.AUTOSTART, Boolean), _defineProperty(_paramsToParsers, QUERY_PARAMS.DEPARTURE, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.CATEGORY, _parsers.binaryParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.TRANSPORT, _parsers.binaryParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.FOOD, _parsers.binaryParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.DATES, _parsers.datesParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.DURATION, _parsers.rangeParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.ADULTS, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.CHILDREN, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), _defineProperty(_paramsToParsers, QUERY_PARAMS.COUNTRY, String), _defineProperty(_paramsToParsers, QUERY_PARAMS.CITIES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.HOTELS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.PRICE, _parsers.rangeParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.RATING, _parsers.rangeParser), _paramsToParsers);

  if (rawValue) {
    if (rawValue === GLUE.empty) {
      return DEFAULTS[paramName];
    }

    if (paramName in paramsToParsers) {
      return paramsToParsers[paramName](rawValue, {
        prevValue: currentValue
      });
    }
  }

  return currentValue;
}
/**
 * Parse query string to query map
 * @param {string} queryString
 * @param {OrderedMap} baseQuery
 *
 * @returns {OrderedMap}
 */


function parseQueryString(queryString, baseQuery) {
  var query = baseQuery || createQuery();
  var params = queryString.replace('#/', '').split('/');
  return query.map(function (currentValue, paramName) {
    var position = query.keySeq().findIndex(function (f) {
      return f === paramName;
    });
    var rawValue = position in params ? params[position] : null;
    return rawValue ? parseQueryParam(currentValue, paramName, rawValue) : currentValue;
  });
}

function parseOSQueryHash(queryHash, baseQuery) {
  var convertListToBooleanMap = function convertListToBooleanMap() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return decodeURIComponent(value).split(',').reduce(function (param, key) {
      return param.set(key, true);
    }, (0, _immutable.Map)());
  };

  var query = baseQuery || createQuery();
  return queryHash.replace(/^#/, '').split('&').map(function (pair) {
    return pair.split('=');
  }).reduce(function (query, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    switch (key) {
      case 'd':
        return query.set(QUERY_PARAMS.DEPARTURE, Number(value));

      case 'c':
        return query.setIn([QUERY_PARAMS.DATES, 'from'], (0, _moment["default"])(value));

      case 'v':
        return query.setIn([QUERY_PARAMS.DATES, 'to'], (0, _moment["default"])(value));

      case 'od':
        return query.set(QUERY_PARAMS.DATES, (0, _immutable.Map)({
          from: (0, _moment["default"])(value),
          to: (0, _moment["default"])(value)
        }));

      case 'l':
      case 'ol':
        return query.set(QUERY_PARAMS.DURATION, (0, _immutable.Map)({
          from: Number(value),
          to: Number(value)
        }));

      case 'p':
        return query.set(QUERY_PARAMS.ADULTS, Number(value.slice(0, 1))).set(QUERY_PARAMS.CHILDREN, (value.slice(1).match(/.{2}/g) || []).map(Number));

      case 'r':
        return query.set(QUERY_PARAMS.TRANSPORT, convertListToBooleanMap(value));

      case 'o':
        return query.set(QUERY_PARAMS.FOOD, convertListToBooleanMap(value));

      default:
        return query;
    }
  }, query);
}