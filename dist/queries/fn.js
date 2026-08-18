"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileChildrenToPeopleField = exports.SHORT_QUERY_NAMES = exports.QUERY_PARAMS = exports.GLUE = void 0;
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Core

// Instruments

const CHILD_BIRTHDATE_FORMAT = 'DD.MM.YYYY';
const CHILD_AGE_FIELD_LENGTH = 2;
const isChildBirthdate = birthday => typeof birthday === 'string';
const birthdateToAge = birthdate => (0, _moment.default)().diff((0, _moment.default)(birthdate, CHILD_BIRTHDATE_FORMAT), 'years');
const resolveChildAge = age => isChildBirthdate(age) ? birthdateToAge(age) : age;
const compileChildrenToPeopleField = children => children.map(resolveChildAge).map(age => String(Math.max(age, 1)).padStart(CHILD_AGE_FIELD_LENGTH, '0')).join('');

/**
 * Query params names
 */
exports.compileChildrenToPeopleField = compileChildrenToPeopleField;
const QUERY_PARAMS = exports.QUERY_PARAMS = {
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
  BYPASS_R_FILTER: 'bypassRFilter',
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
  IS_DIRECT_FLIGHT: 'isDirectFlight',
  SELECTED_OFFER_DATE: 'offerDate',
  SORT: 'sort'
};
const SHORT_QUERY_NAMES = exports.SHORT_QUERY_NAMES = {
  [QUERY_PARAMS.AUTOSTART]: 'a',
  [QUERY_PARAMS.DEPARTURES]: 'd',
  [QUERY_PARAMS.COUNTRY]: 'c',
  [QUERY_PARAMS.CITIES]: 'ci',
  [QUERY_PARAMS.HOTELS]: 'h',
  [QUERY_PARAMS.CATEGORY]: 'ca',
  [QUERY_PARAMS.DATES]: 'da',
  [QUERY_PARAMS.DURATION]: 'du',
  [QUERY_PARAMS.ADULTS]: 'ad',
  [QUERY_PARAMS.CHILDREN]: 'ch',
  [QUERY_PARAMS.FOOD]: 'f',
  [QUERY_PARAMS.TRANSPORTS]: 't',
  [QUERY_PARAMS.PRICE]: 'p',
  [QUERY_PARAMS.PAGE]: 'pa',
  [QUERY_PARAMS.SERVICES]: 's',
  [QUERY_PARAMS.SHORT]: 'sh',
  [QUERY_PARAMS.RATING]: 'r',
  [QUERY_PARAMS.CURRENCY]: 'cu',
  [QUERY_PARAMS.OPERATORS]: 'o',
  [QUERY_PARAMS.SELECTED_OPERATORS]: 'se',
  [QUERY_PARAMS.FLIGHT_AVAILABILITY]: 'fl',
  [QUERY_PARAMS.HOTEL_AVAILABILITY]: 'ho',
  [QUERY_PARAMS.WITHOUT_SPO]: 'w',
  [QUERY_PARAMS.LANGUAGE]: 'l',
  [QUERY_PARAMS.NO_AGENCY_STATS]: 'n',
  [QUERY_PARAMS.IGNORE_SERVICES]: 'i',
  [QUERY_PARAMS.GROUP]: 'g',
  [QUERY_PARAMS.DISTRICTS]: 'di',
  [QUERY_PARAMS.PROVINCES]: 'pr',
  [QUERY_PARAMS.AVERAGE_RATING]: 'av',
  [QUERY_PARAMS.IS_DIRECT_FLIGHT]: 'is',
  [QUERY_PARAMS.SELECTED_OFFER_DATE]: 'of',
  [QUERY_PARAMS.SORT]: 'so'
};

/**
 * Query defaults
 */
const DEFAULTS = {
  [QUERY_PARAMS.AUTOSTART]: false,
  [QUERY_PARAMS.DEPARTURES]: (0, _immutable.List)(),
  [QUERY_PARAMS.COUNTRY]: null,
  [QUERY_PARAMS.CATEGORY]: (0, _immutable.Map)({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  }),
  [QUERY_PARAMS.DATES]: (0, _immutable.Map)({
    from: (0, _moment.default)().add(7, 'days'),
    to: (0, _moment.default)().add(14, 'days')
    // [RANGE_DATE_FIELD]: undefined,
  }),
  [QUERY_PARAMS.DURATION]: (0, _immutable.Map)({
    from: 7,
    to: 9
  }),
  [QUERY_PARAMS.ADULTS]: 2,
  [QUERY_PARAMS.CHILDREN]: (0, _immutable.List)(),
  [QUERY_PARAMS.FOOD]: (0, _immutable.Map)({
    'uai': true,
    'ai': true,
    'fb': true,
    'hb': true,
    'bb': true,
    'ob': true,
    'ro': false
  }),
  [QUERY_PARAMS.TRANSPORTS]: (0, _immutable.List)().push((0, _immutable.Map)({
    'air': true,
    'bus': true,
    'train': true,
    'ship': true,
    'no': false
  })),
  [QUERY_PARAMS.CITIES]: (0, _immutable.Set)(),
  [QUERY_PARAMS.HOTELS]: (0, _immutable.Set)(),
  [QUERY_PARAMS.PRICE]: (0, _immutable.Map)(),
  [QUERY_PARAMS.PAGE]: 1,
  [QUERY_PARAMS.SERVICES]: (0, _immutable.Set)(),
  [QUERY_PARAMS.SHORT]: null,
  [QUERY_PARAMS.RATING]: (0, _immutable.Map)(),
  [QUERY_PARAMS.CURRENCY]: null,
  [QUERY_PARAMS.OPERATORS]: (0, _immutable.Set)(),
  [QUERY_PARAMS.BYPASS_R_FILTER]: (0, _immutable.Set)(),
  [QUERY_PARAMS.SELECTED_OPERATORS]: (0, _immutable.Set)(),
  [QUERY_PARAMS.FLIGHT_AVAILABILITY]: (0, _immutable.Set)(),
  [QUERY_PARAMS.HOTEL_AVAILABILITY]: (0, _immutable.Set)(),
  [QUERY_PARAMS.WITHOUT_SPO]: false,
  [QUERY_PARAMS.LANGUAGE]: null,
  [QUERY_PARAMS.IGNORE_SERVICES]: (0, _immutable.Set)(),
  [QUERY_PARAMS.GROUP]: null,
  [QUERY_PARAMS.DISTRICTS]: (0, _immutable.Set)(),
  [QUERY_PARAMS.PROVINCES]: (0, _immutable.Set)(),
  [QUERY_PARAMS.AVERAGE_RATING]: (0, _immutable.Map)(),
  [QUERY_PARAMS.IS_DIRECT_FLIGHT]: false,
  [QUERY_PARAMS.SELECTED_OFFER_DATE]: null,
  [QUERY_PARAMS.SORT]: _constants.DEFAULT_SORT_BY
};

/**
 * Query string glue
 */
const GLUE = exports.GLUE = {
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
  let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new _immutable.OrderedMap({
    ...DEFAULTS
  }).merge(params);
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
  const fieldsToCompilers = {
    [QUERY_PARAMS.AUTOSTART]: _compilers.numberCompiler,
    [QUERY_PARAMS.DEPARTURES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.COUNTRY]: _compilers.numberCompiler,
    [QUERY_PARAMS.CITIES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.HOTELS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.CATEGORY]: _compilers.binaryCompiler,
    [QUERY_PARAMS.DATES]: _compilers.datesCompiler,
    [QUERY_PARAMS.DURATION]: _compilers.rangeCompiler,
    [QUERY_PARAMS.ADULTS]: _compilers.toStringCompiler,
    [QUERY_PARAMS.CHILDREN]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.FOOD]: _compilers.binaryCompiler,
    [QUERY_PARAMS.TRANSPORTS]: transportsList => (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler)),
    [QUERY_PARAMS.PRICE]: _compilers.rangeCompiler,
    [QUERY_PARAMS.SERVICES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.RATING]: _compilers.rangeCompiler,
    [QUERY_PARAMS.CURRENCY]: _compilers.toStringCompiler,
    [QUERY_PARAMS.WITHOUT_SPO]: _compilers.numberCompiler,
    [QUERY_PARAMS.FLIGHT_AVAILABILITY]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.HOTEL_AVAILABILITY]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.IGNORE_SERVICES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.OPERATORS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.GROUP]: _compilers.numberCompiler,
    [QUERY_PARAMS.DISTRICTS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.PROVINCES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.AVERAGE_RATING]: _compilers.rangeCompiler,
    [QUERY_PARAMS.IS_DIRECT_FLIGHT]: _compilers.numberCompiler,
    [QUERY_PARAMS.SORT]: _compilers.toStringCompiler
  };
  return GLUE.field + query.map((value, field) => value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty).toList().join(GLUE.field).replace(new RegExp(`[${GLUE.field}${GLUE.empty}]+$`), '');
}
function compileSearchQuery(query) {
  const fieldsToCompilers = {
    [QUERY_PARAMS.AUTOSTART]: _compilers.numberCompiler,
    [QUERY_PARAMS.DEPARTURES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.COUNTRY]: _compilers.numberCompiler,
    [QUERY_PARAMS.CITIES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.HOTELS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.CATEGORY]: _compilers.binaryCompiler,
    [QUERY_PARAMS.DATES]: _compilers.datesCompiler,
    [QUERY_PARAMS.DURATION]: _compilers.rangeCompiler,
    [QUERY_PARAMS.ADULTS]: _compilers.toStringCompiler,
    [QUERY_PARAMS.CHILDREN]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.FOOD]: _compilers.binaryCompiler,
    [QUERY_PARAMS.TRANSPORTS]: transportsList => (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler)),
    [QUERY_PARAMS.PRICE]: _compilers.rangeCompiler,
    [QUERY_PARAMS.SERVICES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.RATING]: _compilers.rangeCompiler,
    [QUERY_PARAMS.CURRENCY]: _compilers.toStringCompiler,
    [QUERY_PARAMS.WITHOUT_SPO]: _compilers.numberCompiler,
    [QUERY_PARAMS.FLIGHT_AVAILABILITY]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.HOTEL_AVAILABILITY]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.PAGE]: _compilers.numberCompiler,
    [QUERY_PARAMS.OPERATORS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.IGNORE_SERVICES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.GROUP]: _compilers.numberCompiler,
    [QUERY_PARAMS.DISTRICTS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.PROVINCES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.AVERAGE_RATING]: _compilers.rangeCompiler,
    [QUERY_PARAMS.IS_DIRECT_FLIGHT]: _compilers.numberCompiler,
    [QUERY_PARAMS.SORT]: _compilers.toStringCompiler
  };
  const startDelimeter = GLUE.question;
  const emptyDelimeter = GLUE.empty;
  const delimeter = GLUE.and;
  return startDelimeter + query.map((value, field) => {
    const composeValue = val => `${[SHORT_QUERY_NAMES[field]]}=${val}`;
    const val = value && field in fieldsToCompilers ? composeValue(fieldsToCompilers[field](value)) : composeValue(emptyDelimeter);
    return val;
  }).toList().map(v => v.replace('!', '')).join(delimeter).replace(new RegExp(`[${delimeter}${emptyDelimeter}]+$`), '');
}

/**
 * Compile query to string
 *
 * @param {OrderedMap} query query
 * @returns {Object} otp query
 */
function convertToOtpQuery(query) {
  const converters = {
    [QUERY_PARAMS.DEPARTURES]: list => {
      const value = list.first();
      return value !== _constants.EMPTY_DEPARTURE_VALUE ? {
        'from': value
      } : {};
    },
    [QUERY_PARAMS.COUNTRY]: value => ({
      'to': value
    }),
    [QUERY_PARAMS.CATEGORY]: value => {
      const selected = value.filter(status => status).keySeq().toList();
      const everySelected = selected.size === DEFAULTS[QUERY_PARAMS.CATEGORY].size;
      return {
        'stars': everySelected ? '' : selected.join(',')
      };
    },
    [QUERY_PARAMS.DATES]: value => ({
      'checkIn': value.get('from').format('Y-MM-DD'),
      'checkTo': value.get('to').format('Y-MM-DD')
    }),
    [QUERY_PARAMS.DURATION]: value => ({
      'nights': value.get('from'),
      'nightsTo': value.get('to')
    }),
    [QUERY_PARAMS.ADULTS]: value => ({
      'people': value
    }),
    [QUERY_PARAMS.CHILDREN]: value => ({
      'people': compileChildrenToPeopleField(value)
    }),
    [QUERY_PARAMS.FOOD]: value => ({
      'food': value.filter(status => status).keySeq().toList().join(',')
    }),
    [QUERY_PARAMS.TRANSPORTS]: list => {
      const value = list.first();
      return {
        'transport': value.filter(status => status).keySeq().toList().join(',')
      };
    },
    [QUERY_PARAMS.CITIES]: value => ({
      'toCities': value.join(',')
    }),
    [QUERY_PARAMS.HOTELS]: value => ({
      'toHotels': value.join(',')
    }),
    [QUERY_PARAMS.PRICE]: value => ({
      'price': value.get('from'),
      'priceTo': value.get('to')
    }),
    [QUERY_PARAMS.PAGE]: value => ({
      'page': value
    }),
    [QUERY_PARAMS.SERVICES]: value => ({
      'services': value.join(',')
    }),
    [QUERY_PARAMS.SHORT]: value => ({
      'short': value
    }),
    [QUERY_PARAMS.RATING]: value => ({
      'rate': value.isEmpty() ? null : `${value.get('from')}-${value.get('to')}`
    }),
    [QUERY_PARAMS.CURRENCY]: value => ({
      'currencyLocal': value
    }),
    [QUERY_PARAMS.OPERATORS]: value => ({
      'toOperators': value.toArray()
    }),
    [QUERY_PARAMS.BYPASS_R_FILTER]: value => ({
      'bypassRFilter': value.toArray()
    }),
    [QUERY_PARAMS.FLIGHT_AVAILABILITY]: value => ({
      'availableFlight': value.toArray()
    }),
    [QUERY_PARAMS.HOTEL_AVAILABILITY]: value => ({
      'stopSale': value.toArray()
    }),
    [QUERY_PARAMS.WITHOUT_SPO]: value => ({
      'noPromo': value
    }),
    [QUERY_PARAMS.LANGUAGE]: value => ({
      'lang': value
    }),
    [QUERY_PARAMS.IGNORE_SERVICES]: value => ({
      'ignoreServices': value.join(',')
    }),
    [QUERY_PARAMS.GROUP]: group => ({
      group
    }),
    [QUERY_PARAMS.DISTRICTS]: value => ({
      'toDistricts': value.isEmpty() ? null : value.toArray().join(',')
    }),
    [QUERY_PARAMS.PROVINCES]: value => ({
      'toProvinces': value.isEmpty() ? null : value.toArray().join(',')
    }),
    [QUERY_PARAMS.AVERAGE_RATING]: value => ({
      'rating': value.isEmpty() ? null : `${value.get('from')}-${value.get('to')}`
    }),
    [QUERY_PARAMS.IS_DIRECT_FLIGHT]: value => value ? {
      directFlight: true
    } : null,
    [QUERY_PARAMS.SELECTED_OFFER_DATE]: value => value ? {
      offerDate: value
    } : null,
    [QUERY_PARAMS.SORT]: value => ({
      'sort': value
    })
  };
  return query.filter((value, param) => param in converters).map((value, param) => value ? converters[param](value) : {}).reduce((summary, values) => {
    for (const [param, value] of Object.entries(values)) {
      value && Object.assign(summary, {
        [param]: param in summary ? summary[param] + value : value
      });
    }
    return summary;
  }, {});
}
function parseQueryParam(currentValue, paramName, rawValue) {
  const paramsToParsers = {
    [QUERY_PARAMS.AUTOSTART]: Boolean,
    [QUERY_PARAMS.DEPARTURES]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List),
    [QUERY_PARAMS.CATEGORY]: _parsers.binaryParser,
    [QUERY_PARAMS.TRANSPORTS]: (raw, _ref) => {
      let {
        prevValue: prevList
      } = _ref;
      const arrayParser = (0, _parsers.createImmutableArrayParser)(_immutable.List);
      return arrayParser(raw).map(value => (0, _parsers.binaryParser)(value, {
        prevValue: prevList.first()
      }));
    },
    [QUERY_PARAMS.FOOD]: _parsers.binaryParser,
    [QUERY_PARAMS.DATES]: _parsers.datesParser,
    [QUERY_PARAMS.DURATION]: _parsers.rangeParser,
    [QUERY_PARAMS.ADULTS]: Number,
    [QUERY_PARAMS.CHILDREN]: value => {
      const parseToList = (0, _parsers.createImmutableArrayParser)(_immutable.List);
      const isPureNumber = item => /^\d+$/.test(item);
      const isValidBirthdate = item => (0, _moment.default)(item, CHILD_BIRTHDATE_FORMAT, true).isValid();
      return parseToList(value).filter(item => isPureNumber(item) || isValidBirthdate(item)).map(item => isPureNumber(item) ? Number(item) : item);
    },
    [QUERY_PARAMS.COUNTRY]: String,
    [QUERY_PARAMS.CITIES]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
    [QUERY_PARAMS.HOTELS]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
    [QUERY_PARAMS.PRICE]: _parsers.rangeParser,
    [QUERY_PARAMS.SERVICES]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
    [QUERY_PARAMS.RATING]: _parsers.rangeParser,
    [QUERY_PARAMS.CURRENCY]: String,
    [QUERY_PARAMS.WITHOUT_SPO]: _parsers.parseStringIntengerToBoolean,
    [QUERY_PARAMS.FLIGHT_AVAILABILITY]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
    [QUERY_PARAMS.HOTEL_AVAILABILITY]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
    [QUERY_PARAMS.PAGE]: Number,
    [QUERY_PARAMS.OPERATORS]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
    [QUERY_PARAMS.IGNORE_SERVICES]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
    [QUERY_PARAMS.GROUP]: Number,
    [QUERY_PARAMS.DISTRICTS]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
    [QUERY_PARAMS.PROVINCES]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
    [QUERY_PARAMS.AVERAGE_RATING]: _parsers.rangeParser,
    [QUERY_PARAMS.IS_DIRECT_FLIGHT]: Boolean,
    [QUERY_PARAMS.SORT]: String
  };
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
  let baseQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createQuery();
  const isSearchString = queryString.startsWith('?');
  const params = isSearchString ? queryString.split('&').map(param => param.split('=')[1]) : queryString.split(GLUE.field);
  const keysOfQuery = baseQuery.keySeq();
  return baseQuery.map((currentValue, paramName) => {
    const position = keysOfQuery.findIndex(f => f === paramName);
    const rawValue = position in params ? params[position] : null;
    return rawValue ? parseQueryParam(currentValue, paramName, rawValue) : baseQuery.get(paramName, DEFAULTS[paramName]);
  });
}
function compileQueryToHash(query) {
  const fieldsToCompilers = {
    [QUERY_PARAMS.AUTOSTART]: _compilers.numberCompiler,
    [QUERY_PARAMS.DEPARTURES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.COUNTRY]: _compilers.numberCompiler,
    [QUERY_PARAMS.CITIES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.HOTELS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.CATEGORY]: _compilers.binaryCompiler,
    [QUERY_PARAMS.DATES]: _compilers.datesCompiler,
    [QUERY_PARAMS.DURATION]: _compilers.rangeCompiler,
    [QUERY_PARAMS.ADULTS]: _compilers.toStringCompiler,
    [QUERY_PARAMS.CHILDREN]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.FOOD]: _compilers.binaryCompiler,
    [QUERY_PARAMS.TRANSPORTS]: transportsList => (0, _compilers.immutableArrayCompiler)(transportsList.map(_compilers.binaryCompiler)),
    [QUERY_PARAMS.PRICE]: _compilers.rangeCompiler,
    [QUERY_PARAMS.SERVICES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.RATING]: _compilers.rangeCompiler,
    [QUERY_PARAMS.CURRENCY]: _compilers.toStringCompiler,
    [QUERY_PARAMS.WITHOUT_SPO]: _compilers.numberCompiler,
    [QUERY_PARAMS.FLIGHT_AVAILABILITY]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.HOTEL_AVAILABILITY]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.OPERATORS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.IGNORE_SERVICES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.GROUP]: _compilers.numberCompiler,
    [QUERY_PARAMS.DISTRICTS]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.PROVINCES]: _compilers.immutableArrayCompiler,
    [QUERY_PARAMS.AVERAGE_RATING]: _compilers.rangeCompiler,
    [QUERY_PARAMS.IS_DIRECT_FLIGHT]: _compilers.numberCompiler,
    [QUERY_PARAMS.SORT]: _compilers.toStringCompiler
  };
  return GLUE.field + query.map((value, field) => value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty).toList().join(GLUE.field).replace(new RegExp(`[${GLUE.field}${GLUE.empty}]+$`), '');
}
function parseHashToQuery(queryString) {
  const query = createQuery();
  const params = queryString.replace('#/', '').split('/');
  const parseQueryParam = (currentValue, paramName, rawValue) => {
    const paramsToParsers = {
      [QUERY_PARAMS.AUTOSTART]: Boolean,
      [QUERY_PARAMS.DEPARTURES]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List),
      [QUERY_PARAMS.CATEGORY]: _parsers.binaryParser,
      [QUERY_PARAMS.TRANSPORTS]: (list, _ref2) => {
        let {
          prevValue: prevList
        } = _ref2;
        const arrayParser = (0, _parsers.createImmutableArrayParser)(_immutable.List);
        return arrayParser(list).map(value => (0, _parsers.binaryParser)(value, {
          prevValue: prevList.first()
        }));
      },
      [QUERY_PARAMS.FOOD]: _parsers.binaryParser,
      [QUERY_PARAMS.DATES]: _parsers.datesParser,
      [QUERY_PARAMS.DURATION]: _parsers.rangeParser,
      [QUERY_PARAMS.ADULTS]: Number,
      [QUERY_PARAMS.CHILDREN]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List),
      [QUERY_PARAMS.COUNTRY]: String,
      [QUERY_PARAMS.CITIES]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
      [QUERY_PARAMS.HOTELS]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
      [QUERY_PARAMS.PRICE]: _parsers.rangeParser,
      [QUERY_PARAMS.SERVICES]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
      [QUERY_PARAMS.RATING]: _parsers.rangeParser,
      [QUERY_PARAMS.CURRENCY]: String,
      [QUERY_PARAMS.WITHOUT_SPO]: _parsers.parseStringIntengerToBoolean,
      [QUERY_PARAMS.FLIGHT_AVAILABILITY]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
      [QUERY_PARAMS.HOTEL_AVAILABILITY]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
      [QUERY_PARAMS.OPERATORS]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
      [QUERY_PARAMS.IGNORE_SERVICES]: (0, _parsers.createImmutableArrayParser)(_immutable.Set),
      [QUERY_PARAMS.GROUP]: Number,
      [QUERY_PARAMS.DISTRICTS]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
      [QUERY_PARAMS.PROVINCES]: (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set),
      [QUERY_PARAMS.AVERAGE_RATING]: _parsers.rangeParser,
      [QUERY_PARAMS.IS_DIRECT_FLIGHT]: Boolean,
      [QUERY_PARAMS.SORT]: String
    };
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
  return query.map((currentValue, paramName) => {
    const position = query.keySeq().findIndex(f => f === paramName);
    const rawValue = position in params ? params[position] : null;
    return rawValue ? parseQueryParam(currentValue, paramName, rawValue) : currentValue;
  });
}