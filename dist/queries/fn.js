"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // Core
// Instruments
/**
 * Query params names
 */
var QUERY_PARAMS = exports.QUERY_PARAMS = {
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
  SELECTED_OPERATORS: 'selectedOperators',
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
var DEFAULTS = (_DEFAULTS = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_DEFAULTS, QUERY_PARAMS.AUTOSTART, false), QUERY_PARAMS.DEPARTURES, (0, _immutable.List)()), QUERY_PARAMS.COUNTRY, null), QUERY_PARAMS.CATEGORY, (0, _immutable.Map)({
  1: true,
  2: true,
  3: true,
  4: true,
  5: true
})), QUERY_PARAMS.DATES, (0, _immutable.Map)({
  from: (0, _moment["default"])().add(7, 'days'),
  to: (0, _moment["default"])().add(14, 'days')
})), QUERY_PARAMS.DURATION, (0, _immutable.Map)({
  from: 7,
  to: 9
})), QUERY_PARAMS.ADULTS, 2), QUERY_PARAMS.CHILDREN, (0, _immutable.List)()), QUERY_PARAMS.FOOD, (0, _immutable.Map)({
  'uai': true,
  'ai': true,
  'fb': true,
  'hb': true,
  'bb': true,
  'ob': true,
  'ro': false
})), QUERY_PARAMS.TRANSPORTS, (0, _immutable.List)().push((0, _immutable.Map)({
  'air': true,
  'bus': true,
  'train': true,
  'ship': true,
  'no': false
}))), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_DEFAULTS, QUERY_PARAMS.CITIES, (0, _immutable.Set)()), QUERY_PARAMS.HOTELS, (0, _immutable.Set)()), QUERY_PARAMS.PRICE, (0, _immutable.Map)()), QUERY_PARAMS.PAGE, 1), QUERY_PARAMS.SERVICES, (0, _immutable.Set)()), QUERY_PARAMS.SHORT, null), QUERY_PARAMS.RATING, (0, _immutable.Map)()), QUERY_PARAMS.CURRENCY, null), QUERY_PARAMS.OPERATORS, (0, _immutable.Set)()), QUERY_PARAMS.SELECTED_OPERATORS, (0, _immutable.Set)()), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_DEFAULTS, QUERY_PARAMS.FLIGHT_AVAILABILITY, (0, _immutable.Set)()), QUERY_PARAMS.HOTEL_AVAILABILITY, (0, _immutable.Set)()), QUERY_PARAMS.WITHOUT_SPO, false), QUERY_PARAMS.LANGUAGE, null), QUERY_PARAMS.IGNORE_SERVICES, (0, _immutable.Set)()), QUERY_PARAMS.GROUP, null), QUERY_PARAMS.DISTRICTS, (0, _immutable.Set)()), QUERY_PARAMS.PROVINCES, (0, _immutable.Set)()), QUERY_PARAMS.AVERAGE_RATING, (0, _immutable.Map)()), QUERY_PARAMS.IS_DIRECT_FLIGHT, false));

/**
 * Query string glue
 */
var GLUE = exports.GLUE = {
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
  var fieldsToCompilers = (_fieldsToCompilers = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers, QUERY_PARAMS.AUTOSTART, _compilers.numberCompiler), QUERY_PARAMS.DEPARTURES, _compilers.immutableArrayCompiler), QUERY_PARAMS.COUNTRY, _compilers.numberCompiler), QUERY_PARAMS.CITIES, _compilers.immutableArrayCompiler), QUERY_PARAMS.HOTELS, _compilers.immutableArrayCompiler), QUERY_PARAMS.CATEGORY, _compilers.binaryCompiler), QUERY_PARAMS.DATES, _compilers.datesCompiler), QUERY_PARAMS.DURATION, _compilers.rangeCompiler), QUERY_PARAMS.ADULTS, _compilers.toStringCompiler), QUERY_PARAMS.CHILDREN, _compilers.immutableArrayCompiler), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers, QUERY_PARAMS.FOOD, _compilers.binaryCompiler), QUERY_PARAMS.TRANSPORTS, function (transportsList) {
    return (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler));
  }), QUERY_PARAMS.PRICE, _compilers.rangeCompiler), QUERY_PARAMS.SERVICES, _compilers.immutableArrayCompiler), QUERY_PARAMS.RATING, _compilers.rangeCompiler), QUERY_PARAMS.CURRENCY, _compilers.toStringCompiler), QUERY_PARAMS.WITHOUT_SPO, _compilers.numberCompiler), QUERY_PARAMS.FLIGHT_AVAILABILITY, _compilers.immutableArrayCompiler), QUERY_PARAMS.HOTEL_AVAILABILITY, _compilers.immutableArrayCompiler), QUERY_PARAMS.IGNORE_SERVICES, _compilers.immutableArrayCompiler), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers, QUERY_PARAMS.OPERATORS, _compilers.immutableArrayCompiler), QUERY_PARAMS.GROUP, _compilers.numberCompiler), QUERY_PARAMS.DISTRICTS, _compilers.immutableArrayCompiler), QUERY_PARAMS.PROVINCES, _compilers.immutableArrayCompiler), QUERY_PARAMS.AVERAGE_RATING, _compilers.rangeCompiler), QUERY_PARAMS.IS_DIRECT_FLIGHT, _compilers.numberCompiler));
  return GLUE.field + query.map(function (value, field) {
    return value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty;
  }).toList().join(GLUE.field).replace(new RegExp("[".concat(GLUE.field).concat(GLUE.empty, "]+$")), '');
}
function compileSearchQuery(query) {
  var _fieldsToCompilers2;
  var fieldsToCompilers = (_fieldsToCompilers2 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers2, QUERY_PARAMS.AUTOSTART, _compilers.numberCompiler), QUERY_PARAMS.DEPARTURES, _compilers.immutableArrayCompiler), QUERY_PARAMS.COUNTRY, _compilers.numberCompiler), QUERY_PARAMS.CITIES, _compilers.immutableArrayCompiler), QUERY_PARAMS.HOTELS, _compilers.immutableArrayCompiler), QUERY_PARAMS.CATEGORY, _compilers.binaryCompiler), QUERY_PARAMS.DATES, _compilers.datesCompiler), QUERY_PARAMS.DURATION, _compilers.rangeCompiler), QUERY_PARAMS.ADULTS, _compilers.toStringCompiler), QUERY_PARAMS.CHILDREN, _compilers.immutableArrayCompiler), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers2, QUERY_PARAMS.FOOD, _compilers.binaryCompiler), QUERY_PARAMS.TRANSPORTS, function (transportsList) {
    return (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler));
  }), QUERY_PARAMS.PRICE, _compilers.rangeCompiler), QUERY_PARAMS.SERVICES, _compilers.immutableArrayCompiler), QUERY_PARAMS.RATING, _compilers.rangeCompiler), QUERY_PARAMS.CURRENCY, _compilers.toStringCompiler), QUERY_PARAMS.WITHOUT_SPO, _compilers.numberCompiler), QUERY_PARAMS.FLIGHT_AVAILABILITY, _compilers.immutableArrayCompiler), QUERY_PARAMS.HOTEL_AVAILABILITY, _compilers.immutableArrayCompiler), QUERY_PARAMS.PAGE, _compilers.numberCompiler), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers2, QUERY_PARAMS.OPERATORS, _compilers.immutableArrayCompiler), QUERY_PARAMS.IGNORE_SERVICES, _compilers.immutableArrayCompiler), QUERY_PARAMS.GROUP, _compilers.numberCompiler), QUERY_PARAMS.DISTRICTS, _compilers.immutableArrayCompiler), QUERY_PARAMS.PROVINCES, _compilers.immutableArrayCompiler), QUERY_PARAMS.AVERAGE_RATING, _compilers.rangeCompiler), QUERY_PARAMS.IS_DIRECT_FLIGHT, _compilers.numberCompiler));
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
  var converters = (_converters = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_converters, QUERY_PARAMS.DEPARTURES, function (list) {
    var value = list.first();
    return value !== _constants.EMPTY_DEPARTURE_VALUE ? {
      'from': value
    } : {};
  }), QUERY_PARAMS.COUNTRY, function (value) {
    return {
      'to': value
    };
  }), QUERY_PARAMS.CATEGORY, function (value) {
    var selected = value.filter(function (status) {
      return status;
    }).keySeq().toList();
    var everySelected = selected.size === DEFAULTS[QUERY_PARAMS.CATEGORY].size;
    return {
      'stars': everySelected ? '' : selected.join(',')
    };
  }), QUERY_PARAMS.DATES, function (value) {
    return {
      'checkIn': value.get('from').format('Y-MM-DD'),
      'checkTo': value.get('to').format('Y-MM-DD')
    };
  }), QUERY_PARAMS.DURATION, function (value) {
    return {
      'nights': value.get('from'),
      'nightsTo': value.get('to')
    };
  }), QUERY_PARAMS.ADULTS, function (value) {
    return {
      'people': value
    };
  }), QUERY_PARAMS.CHILDREN, function (value) {
    return {
      'people': value.map(function (age) {
        return typeof age === 'string' ? age.replace(/\D.+/, '') : age;
      }).map(String).map(function (age) {
        return age.length === 1 ? "0".concat(age) : age;
      }).join('')
    };
  }), QUERY_PARAMS.FOOD, function (value) {
    return {
      'food': value.filter(function (status) {
        return status;
      }).keySeq().toList().join(',')
    };
  }), QUERY_PARAMS.TRANSPORTS, function (list) {
    var value = list.first();
    return {
      'transport': value.filter(function (status) {
        return status;
      }).keySeq().toList().join(',')
    };
  }), QUERY_PARAMS.CITIES, function (value) {
    return {
      'toCities': value.join(',')
    };
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_converters, QUERY_PARAMS.HOTELS, function (value) {
    return {
      'toHotels': value.join(',')
    };
  }), QUERY_PARAMS.PRICE, function (value) {
    return {
      'price': value.get('from'),
      'priceTo': value.get('to')
    };
  }), QUERY_PARAMS.PAGE, function (value) {
    return {
      'page': value
    };
  }), QUERY_PARAMS.SERVICES, function (value) {
    return {
      'services': value.join(',')
    };
  }), QUERY_PARAMS.SHORT, function (value) {
    return {
      'short': value
    };
  }), QUERY_PARAMS.RATING, function (value) {
    return {
      'rate': value.isEmpty() ? null : "".concat(value.get('from'), "-").concat(value.get('to'))
    };
  }), QUERY_PARAMS.CURRENCY, function (value) {
    return {
      'currencyLocal': value
    };
  }), QUERY_PARAMS.OPERATORS, function (value) {
    return {
      'toOperators': value.toArray()
    };
  }), QUERY_PARAMS.FLIGHT_AVAILABILITY, function (value) {
    return {
      'availableFlight': value.toArray()
    };
  }), QUERY_PARAMS.HOTEL_AVAILABILITY, function (value) {
    return {
      'stopSale': value.toArray()
    };
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_converters, QUERY_PARAMS.WITHOUT_SPO, function (value) {
    return {
      'noPromo': value
    };
  }), QUERY_PARAMS.LANGUAGE, function (value) {
    return {
      'lang': value
    };
  }), QUERY_PARAMS.IGNORE_SERVICES, function (value) {
    return {
      'ignoreServices': value.join(',')
    };
  }), QUERY_PARAMS.GROUP, function (group) {
    return {
      group: group
    };
  }), QUERY_PARAMS.DISTRICTS, function (value) {
    return {
      'toDistricts': value.isEmpty() ? null : value.toArray().join(',')
    };
  }), QUERY_PARAMS.PROVINCES, function (value) {
    return {
      'toProvinces': value.isEmpty() ? null : value.toArray().join(',')
    };
  }), QUERY_PARAMS.AVERAGE_RATING, function (value) {
    return {
      'rating': value.isEmpty() ? null : "".concat(value.get('from'), "-").concat(value.get('to'))
    };
  }), QUERY_PARAMS.IS_DIRECT_FLIGHT, function (value) {
    return value ? {
      directFlight: true
    } : null;
  }));
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
  var paramsToParsers = (_paramsToParsers = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_paramsToParsers, QUERY_PARAMS.AUTOSTART, Boolean), QUERY_PARAMS.DEPARTURES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), QUERY_PARAMS.CATEGORY, _parsers.binaryParser), QUERY_PARAMS.TRANSPORTS, function (raw, _ref) {
    var prevList = _ref.prevValue;
    var arrayParser = (0, _parsers.createImmutableArrayParser)(_immutable.List);
    return arrayParser(raw).map(function (value) {
      return (0, _parsers.binaryParser)(value, {
        prevValue: prevList.first()
      });
    });
  }), QUERY_PARAMS.FOOD, _parsers.binaryParser), QUERY_PARAMS.DATES, _parsers.datesParser), QUERY_PARAMS.DURATION, _parsers.rangeParser), QUERY_PARAMS.ADULTS, Number), QUERY_PARAMS.CHILDREN, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), QUERY_PARAMS.COUNTRY, String), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_paramsToParsers, QUERY_PARAMS.CITIES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), QUERY_PARAMS.HOTELS, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.PRICE, _parsers.rangeParser), QUERY_PARAMS.SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.RATING, _parsers.rangeParser), QUERY_PARAMS.CURRENCY, String), QUERY_PARAMS.WITHOUT_SPO, _parsers.parseStringIntengerToBoolean), QUERY_PARAMS.FLIGHT_AVAILABILITY, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.HOTEL_AVAILABILITY, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.PAGE, Number), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_paramsToParsers, QUERY_PARAMS.OPERATORS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), QUERY_PARAMS.IGNORE_SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.GROUP, Number), QUERY_PARAMS.DISTRICTS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), QUERY_PARAMS.PROVINCES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), QUERY_PARAMS.AVERAGE_RATING, _parsers.rangeParser), QUERY_PARAMS.IS_DIRECT_FLIGHT, Boolean));
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
  var fieldsToCompilers = (_fieldsToCompilers3 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers3, QUERY_PARAMS.AUTOSTART, _compilers.numberCompiler), QUERY_PARAMS.DEPARTURES, _compilers.immutableArrayCompiler), QUERY_PARAMS.COUNTRY, _compilers.numberCompiler), QUERY_PARAMS.CITIES, _compilers.immutableArrayCompiler), QUERY_PARAMS.HOTELS, _compilers.immutableArrayCompiler), QUERY_PARAMS.CATEGORY, _compilers.binaryCompiler), QUERY_PARAMS.DATES, _compilers.datesCompiler), QUERY_PARAMS.DURATION, _compilers.rangeCompiler), QUERY_PARAMS.ADULTS, _compilers.toStringCompiler), QUERY_PARAMS.CHILDREN, _compilers.immutableArrayCompiler), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers3, QUERY_PARAMS.FOOD, _compilers.binaryCompiler), QUERY_PARAMS.TRANSPORTS, function (transportsList) {
    return (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler));
  }), QUERY_PARAMS.PRICE, _compilers.rangeCompiler), QUERY_PARAMS.SERVICES, _compilers.immutableArrayCompiler), QUERY_PARAMS.RATING, _compilers.rangeCompiler), QUERY_PARAMS.CURRENCY, _compilers.toStringCompiler), QUERY_PARAMS.WITHOUT_SPO, _compilers.numberCompiler), QUERY_PARAMS.FLIGHT_AVAILABILITY, _compilers.immutableArrayCompiler), QUERY_PARAMS.HOTEL_AVAILABILITY, _compilers.immutableArrayCompiler), QUERY_PARAMS.OPERATORS, _compilers.immutableArrayCompiler), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_fieldsToCompilers3, QUERY_PARAMS.IGNORE_SERVICES, _compilers.immutableArrayCompiler), QUERY_PARAMS.GROUP, _compilers.numberCompiler), QUERY_PARAMS.DISTRICTS, _compilers.immutableArrayCompiler), QUERY_PARAMS.PROVINCES, _compilers.immutableArrayCompiler), QUERY_PARAMS.AVERAGE_RATING, _compilers.rangeCompiler), QUERY_PARAMS.IS_DIRECT_FLIGHT, _compilers.numberCompiler));
  return GLUE.field + query.map(function (value, field) {
    return value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty;
  }).toList().join(GLUE.field).replace(new RegExp("[".concat(GLUE.field).concat(GLUE.empty, "]+$")), '');
}
function parseHashToQuery(queryString) {
  var query = createQuery();
  var params = queryString.replace('#/', '').split('/');
  var parseQueryParam = function parseQueryParam(currentValue, paramName, rawValue) {
    var _paramsToParsers2;
    var paramsToParsers = (_paramsToParsers2 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_paramsToParsers2, QUERY_PARAMS.AUTOSTART, Boolean), QUERY_PARAMS.DEPARTURES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), QUERY_PARAMS.CATEGORY, _parsers.binaryParser), QUERY_PARAMS.TRANSPORTS, function (list, _ref2) {
      var prevList = _ref2.prevValue;
      var arrayParser = (0, _parsers.createImmutableArrayParser)(_immutable.List);
      return arrayParser(list).map(function (value) {
        return (0, _parsers.binaryParser)(value, {
          prevValue: prevList.first()
        });
      });
    }), QUERY_PARAMS.FOOD, _parsers.binaryParser), QUERY_PARAMS.DATES, _parsers.datesParser), QUERY_PARAMS.DURATION, _parsers.rangeParser), QUERY_PARAMS.ADULTS, Number), QUERY_PARAMS.CHILDREN, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), QUERY_PARAMS.COUNTRY, String), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_paramsToParsers2, QUERY_PARAMS.CITIES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), QUERY_PARAMS.HOTELS, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.PRICE, _parsers.rangeParser), QUERY_PARAMS.SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.RATING, _parsers.rangeParser), QUERY_PARAMS.CURRENCY, String), QUERY_PARAMS.WITHOUT_SPO, _parsers.parseStringIntengerToBoolean), QUERY_PARAMS.FLIGHT_AVAILABILITY, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.HOTEL_AVAILABILITY, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.OPERATORS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_paramsToParsers2, QUERY_PARAMS.IGNORE_SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), QUERY_PARAMS.GROUP, Number), QUERY_PARAMS.DISTRICTS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), QUERY_PARAMS.PROVINCES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), QUERY_PARAMS.AVERAGE_RATING, _parsers.rangeParser), QUERY_PARAMS.IS_DIRECT_FLIGHT, Boolean));
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