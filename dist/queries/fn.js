"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QUERY_PARAMS = exports.GLUE = void 0;
exports.compileQuery = compileQuery;
exports.compileQueryToHash = compileQueryToHash;
exports.compileSearchQuery = compileSearchQuery;
exports.convertToOtpQuery = convertToOtpQuery;
exports.createQuery = createQuery;
exports.createResultBones = createResultBones;
exports.parseHashToQuery = parseHashToQuery;
exports.parseQueryString = parseQueryString;

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

var _compilers = require("./compilers");

var _parsers = require("./parsers");

var _constants = require("./constants");

var _DEFAULTS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Query params names
 */
var QUERY_PARAMS = {
  AUTOSTART: 'autostart',
  DEPARTURES: 'departures',
  COUNTRY: 'country',
  CITIES: 'cities',
  HOTELS: 'hotels',
  CATEGORY: 'category',
  DATES: 'dates',
  DURATION: 'duration',
  ADULTS: 'adults',
  CHILDREN: 'children',
  FOOD: 'food',
  TRANSPORTS: 'transports',
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
  LANGUAGE: 'language',
  NO_AGENCY_STATS: 'noAgencyStats',
  IGNORE_SERVICES: 'ignoreServices',
  GROUP: 'group',
  DISTRICTS: 'districts',
  PROVINCES: 'provinces',
  AVERAGE_RATING: 'averageRating',
  IS_DIRECT_FLIGHT: 'isDirectFlight'
};
exports.QUERY_PARAMS = QUERY_PARAMS;

var getShortQueryParams = function getShortQueryParams() {
  var isParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var uniqKeys = new _immutable.Set();
  var result = {};

  for (var _i = 0, _Object$entries = Object.entries(QUERY_PARAMS); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        val = _Object$entries$_i[1];

    var count = 1;

    while (count < val.length) {
      if (!uniqKeys.has(val.slice(0, count))) {
        break;
      }

      count += 1;
    }

    uniqKeys = uniqKeys.add(val.slice(0, count));
    result[isParam ? key : val] = val.slice(0, count);
  }

  return result;
};

var SHORT_QUERY_NAMES = getShortQueryParams();
/**
 * Query defaults
 */

var DEFAULTS = (_DEFAULTS = {}, _defineProperty(_DEFAULTS, QUERY_PARAMS.AUTOSTART, false), _defineProperty(_DEFAULTS, QUERY_PARAMS.DEPARTURES, (0, _immutable.List)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.COUNTRY, null), _defineProperty(_DEFAULTS, QUERY_PARAMS.CATEGORY, (0, _immutable.Map)({
  1: true,
  2: true,
  3: true,
  4: true,
  5: true
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.DATES, (0, _immutable.Map)({
  from: (0, _moment["default"])().add(7, 'days'),
  to: (0, _moment["default"])().add(14, 'days')
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.DURATION, (0, _immutable.Map)({
  from: 7,
  to: 9
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.ADULTS, 2), _defineProperty(_DEFAULTS, QUERY_PARAMS.CHILDREN, (0, _immutable.List)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.FOOD, (0, _immutable.Map)({
  'uai': true,
  'ai': true,
  'fb': true,
  'hb': true,
  'bb': true,
  'ob': true,
  'ro': false
})), _defineProperty(_DEFAULTS, QUERY_PARAMS.TRANSPORTS, (0, _immutable.List)().push((0, _immutable.Map)({
  'air': true,
  'bus': true,
  'train': true,
  'ship': true,
  'no': false
}))), _defineProperty(_DEFAULTS, QUERY_PARAMS.CITIES, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.HOTELS, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.PRICE, (0, _immutable.Map)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.PAGE, 1), _defineProperty(_DEFAULTS, QUERY_PARAMS.SERVICES, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.SHORT, null), _defineProperty(_DEFAULTS, QUERY_PARAMS.RATING, (0, _immutable.Map)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.CURRENCY, null), _defineProperty(_DEFAULTS, QUERY_PARAMS.OPERATORS, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.FLIGHT_AVAILABILITY, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.HOTEL_AVAILABILITY, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.WITHOUT_SPO, false), _defineProperty(_DEFAULTS, QUERY_PARAMS.LANGUAGE, null), _defineProperty(_DEFAULTS, QUERY_PARAMS.IGNORE_SERVICES, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.GROUP, null), _defineProperty(_DEFAULTS, QUERY_PARAMS.DISTRICTS, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.PROVINCES, (0, _immutable.Set)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.AVERAGE_RATING, (0, _immutable.Map)()), _defineProperty(_DEFAULTS, QUERY_PARAMS.IS_DIRECT_FLIGHT, false), _DEFAULTS);
/**
 * Query string glue
 */

var GLUE = {
  field: '/',
  range: '-',
  list: ',',
  binary: '',
  empty: '!',
  and: '&',
  question: '?'
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

  var fieldsToCompilers = (_fieldsToCompilers = {}, _defineProperty(_fieldsToCompilers, QUERY_PARAMS.AUTOSTART, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DEPARTURES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.COUNTRY, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.CITIES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.HOTELS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.CATEGORY, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DATES, _compilers.datesCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DURATION, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.ADULTS, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.CHILDREN, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.FOOD, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.TRANSPORTS, function (transportsList) {
    return (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler));
  }), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.PRICE, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.SERVICES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.RATING, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.CURRENCY, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.WITHOUT_SPO, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.FLIGHT_AVAILABILITY, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.HOTEL_AVAILABILITY, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.IGNORE_SERVICES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.OPERATORS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.GROUP, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DISTRICTS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.PROVINCES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.AVERAGE_RATING, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.IS_DIRECT_FLIGHT, _compilers.numberCompiler), _fieldsToCompilers);
  return GLUE.field + query.map(function (value, field) {
    return value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty;
  }).toList().join(GLUE.field).replace(new RegExp("[".concat(GLUE.field).concat(GLUE.empty, "]+$")), '');
}

function compileSearchQuery(query) {
  var _fieldsToCompilers2;

  var fieldsToCompilers = (_fieldsToCompilers2 = {}, _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.AUTOSTART, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.DEPARTURES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.COUNTRY, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.CITIES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.HOTELS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.CATEGORY, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.DATES, _compilers.datesCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.DURATION, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.ADULTS, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.CHILDREN, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.FOOD, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.TRANSPORTS, function (transportsList) {
    return (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler));
  }), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.PRICE, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.SERVICES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.RATING, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.CURRENCY, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.WITHOUT_SPO, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.FLIGHT_AVAILABILITY, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.HOTEL_AVAILABILITY, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.PAGE, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.OPERATORS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.IGNORE_SERVICES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.GROUP, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.DISTRICTS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.PROVINCES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.AVERAGE_RATING, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers2, QUERY_PARAMS.IS_DIRECT_FLIGHT, _compilers.numberCompiler), _fieldsToCompilers2);
  var startDelimeter = GLUE.question;
  var emptyDelimeter = GLUE.empty;
  var delimeter = GLUE.and;
  return startDelimeter + query.map(function (value, field) {
    var composeValue = function composeValue(val) {
      return "".concat([SHORT_QUERY_NAMES[field]], "=").concat(val);
    };

    var val = value && field in fieldsToCompilers ? composeValue(fieldsToCompilers[field](value)) : composeValue(emptyDelimeter);
    return val;
  }).toList().map(function (v) {
    return v.replace('!', '');
  }).join(delimeter).replace(new RegExp("[".concat(delimeter).concat(emptyDelimeter, "]+$")), '');
}
/**
 * Compile query to string
 *
 * @param {OrderedMap} query query
 * @returns {Object} otp query
 */


function convertToOtpQuery(query) {
  var _converters;

  var converters = (_converters = {}, _defineProperty(_converters, QUERY_PARAMS.DEPARTURES, function (list) {
    var value = list.first();
    return value !== _constants.EMPTY_DEPARTURE_VALUE ? {
      'from': value
    } : {};
  }), _defineProperty(_converters, QUERY_PARAMS.COUNTRY, function (value) {
    return {
      'to': value
    };
  }), _defineProperty(_converters, QUERY_PARAMS.CATEGORY, function (value) {
    var selected = value.filter(function (status) {
      return status;
    }).keySeq().toList();
    var everySelected = selected.size === DEFAULTS[QUERY_PARAMS.CATEGORY].size;
    return {
      'stars': everySelected ? '' : selected.join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.DATES, function (value) {
    return {
      'checkIn': value.get('from').format('Y-MM-DD'),
      'checkTo': value.get('to').format('Y-MM-DD')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.DURATION, function (value) {
    return {
      'nights': value.get('from'),
      'nightsTo': value.get('to')
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
  }), _defineProperty(_converters, QUERY_PARAMS.TRANSPORTS, function (list) {
    var value = list.first();
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
      'currencyLocal': value
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
  }), _defineProperty(_converters, QUERY_PARAMS.IGNORE_SERVICES, function (value) {
    return {
      'ignoreServices': value.join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.GROUP, function (group) {
    return {
      group: group
    };
  }), _defineProperty(_converters, QUERY_PARAMS.DISTRICTS, function (value) {
    return {
      'toDistricts': value.isEmpty() ? null : value.toArray().join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.PROVINCES, function (value) {
    return {
      'toProvinces': value.isEmpty() ? null : value.toArray().join(',')
    };
  }), _defineProperty(_converters, QUERY_PARAMS.AVERAGE_RATING, function (value) {
    return {
      'rating': value.isEmpty() ? null : "".concat(value.get('from'), "-").concat(value.get('to'))
    };
  }), _defineProperty(_converters, QUERY_PARAMS.IS_DIRECT_FLIGHT, function (value) {
    return value ? {
      directFlight: true
    } : null;
  }), _converters);
  return query.filter(function (value, param) {
    return param in converters;
  }).map(function (value, param) {
    return value ? converters[param](value) : {};
  }).reduce(function (summary, values) {
    for (var _i2 = 0, _Object$entries2 = Object.entries(values); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          param = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      value && Object.assign(summary, _defineProperty({}, param, param in summary ? summary[param] + value : value));
    }

    return summary;
  }, {});
}

function parseQueryParam(currentValue, paramName, rawValue) {
  var _paramsToParsers;

  var paramsToParsers = (_paramsToParsers = {}, _defineProperty(_paramsToParsers, QUERY_PARAMS.AUTOSTART, Boolean), _defineProperty(_paramsToParsers, QUERY_PARAMS.DEPARTURES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), _defineProperty(_paramsToParsers, QUERY_PARAMS.CATEGORY, _parsers.binaryParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.TRANSPORTS, function (raw, _ref) {
    var prevList = _ref.prevValue;
    var arrayParser = (0, _parsers.createImmutableArrayParser)(_immutable.List);
    return arrayParser(raw).map(function (value) {
      return (0, _parsers.binaryParser)(value, {
        prevValue: prevList.first()
      });
    });
  }), _defineProperty(_paramsToParsers, QUERY_PARAMS.FOOD, _parsers.binaryParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.DATES, _parsers.datesParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.DURATION, _parsers.rangeParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.ADULTS, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.CHILDREN, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), _defineProperty(_paramsToParsers, QUERY_PARAMS.COUNTRY, String), _defineProperty(_paramsToParsers, QUERY_PARAMS.CITIES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.HOTELS, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.PRICE, _parsers.rangeParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.RATING, _parsers.rangeParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.CURRENCY, String), _defineProperty(_paramsToParsers, QUERY_PARAMS.WITHOUT_SPO, _parsers.parseStringIntengerToBoolean), _defineProperty(_paramsToParsers, QUERY_PARAMS.FLIGHT_AVAILABILITY, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.HOTEL_AVAILABILITY, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.PAGE, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.OPERATORS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.IGNORE_SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.GROUP, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.DISTRICTS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.PROVINCES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, QUERY_PARAMS.AVERAGE_RATING, _parsers.rangeParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.IS_DIRECT_FLIGHT, Boolean), _paramsToParsers);

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
 * @param {string} queryString input
 * @param {OrderedMap} baseQuery base
 * @param {Object} delimeters optional delimeters object
 *
 * @returns {OrderedMap} query
 */


function parseQueryString(queryString) {
  var baseQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createQuery();
  var isSearchString = queryString.startsWith('?');
  var params = isSearchString ? queryString.split('&').map(function (param) {
    return param.split('=')[1];
  }) : queryString.split(GLUE.field);
  var keysOfQuery = baseQuery.keySeq();
  return baseQuery.map(function (currentValue, paramName) {
    var position = keysOfQuery.findIndex(function (f) {
      return f === paramName;
    });
    var rawValue = position in params ? params[position] : null;
    return rawValue ? parseQueryParam(currentValue, paramName, rawValue) : baseQuery.get(paramName, DEFAULTS[paramName]);
  });
}

function compileQueryToHash(query) {
  var _fieldsToCompilers3;

  var fieldsToCompilers = (_fieldsToCompilers3 = {}, _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.AUTOSTART, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.DEPARTURES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.COUNTRY, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.CITIES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.HOTELS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.CATEGORY, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.DATES, _compilers.datesCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.DURATION, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.ADULTS, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.CHILDREN, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.FOOD, _compilers.binaryCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.TRANSPORTS, function (transportsList) {
    return (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler));
  }), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.PRICE, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.SERVICES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.RATING, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.CURRENCY, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.WITHOUT_SPO, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.FLIGHT_AVAILABILITY, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.HOTEL_AVAILABILITY, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.OPERATORS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.IGNORE_SERVICES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.GROUP, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.DISTRICTS, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.PROVINCES, _compilers.immutableArrayCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.AVERAGE_RATING, _compilers.rangeCompiler), _defineProperty(_fieldsToCompilers3, QUERY_PARAMS.IS_DIRECT_FLIGHT, _compilers.numberCompiler), _fieldsToCompilers3);
  return GLUE.field + query.map(function (value, field) {
    return value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty;
  }).toList().join(GLUE.field).replace(new RegExp("[".concat(GLUE.field).concat(GLUE.empty, "]+$")), '');
}

function parseHashToQuery(queryString) {
  var query = createQuery();
  var params = queryString.replace('#/', '').split('/');

  var parseQueryParam = function parseQueryParam(currentValue, paramName, rawValue) {
    var _paramsToParsers2;

    var paramsToParsers = (_paramsToParsers2 = {}, _defineProperty(_paramsToParsers2, QUERY_PARAMS.AUTOSTART, Boolean), _defineProperty(_paramsToParsers2, QUERY_PARAMS.DEPARTURES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.CATEGORY, _parsers.binaryParser), _defineProperty(_paramsToParsers2, QUERY_PARAMS.TRANSPORTS, function (list, _ref2) {
      var prevList = _ref2.prevValue;
      var arrayParser = (0, _parsers.createImmutableArrayParser)(_immutable.List);
      return arrayParser(list).map(function (value) {
        return (0, _parsers.binaryParser)(value, {
          prevValue: prevList.first()
        });
      });
    }), _defineProperty(_paramsToParsers2, QUERY_PARAMS.FOOD, _parsers.binaryParser), _defineProperty(_paramsToParsers2, QUERY_PARAMS.DATES, _parsers.datesParser), _defineProperty(_paramsToParsers2, QUERY_PARAMS.DURATION, _parsers.rangeParser), _defineProperty(_paramsToParsers2, QUERY_PARAMS.ADULTS, Number), _defineProperty(_paramsToParsers2, QUERY_PARAMS.CHILDREN, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.COUNTRY, String), _defineProperty(_paramsToParsers2, QUERY_PARAMS.CITIES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.HOTELS, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.PRICE, _parsers.rangeParser), _defineProperty(_paramsToParsers2, QUERY_PARAMS.SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.RATING, _parsers.rangeParser), _defineProperty(_paramsToParsers2, QUERY_PARAMS.CURRENCY, String), _defineProperty(_paramsToParsers2, QUERY_PARAMS.WITHOUT_SPO, _parsers.parseStringIntengerToBoolean), _defineProperty(_paramsToParsers2, QUERY_PARAMS.FLIGHT_AVAILABILITY, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.HOTEL_AVAILABILITY, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.OPERATORS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.IGNORE_SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.GROUP, Number), _defineProperty(_paramsToParsers2, QUERY_PARAMS.DISTRICTS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.PROVINCES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers2, QUERY_PARAMS.AVERAGE_RATING, _parsers.rangeParser), _defineProperty(_paramsToParsers2, QUERY_PARAMS.IS_DIRECT_FLIGHT, Boolean), _paramsToParsers2);

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
  };

  return query.map(function (currentValue, paramName) {
    var position = query.keySeq().findIndex(function (f) {
      return f === paramName;
    });
    var rawValue = position in params ? params[position] : null;
    return rawValue ? parseQueryParam(currentValue, paramName, rawValue) : currentValue;
  });
}