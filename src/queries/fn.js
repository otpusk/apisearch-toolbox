// Core
import { OrderedMap, Map, Set, List } from 'immutable';
import moment from 'moment';

// Instruments
import {
    binaryCompiler,
    rangeCompiler,
    datesCompiler,
    numberCompiler,
    toStringCompiler,
    immutableArrayCompiler
} from './compilers';
import {
    rangeParser,
    datesParser,
    binaryParser,
    createImmutableArrayParser,
    createImmutableNumbersArrayParser,
    parseStringIntengerToBoolean
} from './parsers';

/**
 * Query params names
 */
const QUERY_PARAMS = {
    AUTOSTART:           'autostart',
    DEPARTURE:           'departure',
    COUNTRY:             'country',
    CITIES:              'cities',
    HOTELS:              'hotels',
    CATEGORY:            'category',
    DATES:               'dates',
    DURATION:            'duration',
    ADULTS:              'adults',
    CHILDREN:            'children',
    FOOD:                'food',
    TRANSPORT:           'transport',
    PRICE:               'price',
    PAGE:                'page',
    SERVICES:            'services',
    SHORT:               'short',
    RATING:              'rating',
    CURRENCY:            'currency',
    OPERATORS:           'operators',
    FLIGHT_AVAILABILITY: 'flightAvailability',
    HOTEL_AVAILABILITY:  'hotelAvailability',
    WITHOUT_SPO:         'withoutSPO',
    LANGUAGE:            'language',
    NO_AGENCY_STATS:     'noAgencyStats',
};

const getShortQueryParams = (isParam = false) => {
    let uniqKeys = new Set();
    const result = {};

    for (const [key, val] of Object.entries(QUERY_PARAMS)) {
        let count = 1;

        while (count < val.length) {
            if (!uniqKeys.has(val.slice(0, count))) {
                break;
            }
            count+=1;
        }

        uniqKeys = uniqKeys.add(val.slice(0, count));
        result[isParam ? key : val] = val.slice(0, count);
    }

    return result;
};

const SHORT_QUERY_NAMES = getShortQueryParams();
const SHORT_QUERY_PARAMS = getShortQueryParams(true);

/**
 * Query defaults
 */
const DEFAULTS = {
    [QUERY_PARAMS.AUTOSTART]: false,
    [QUERY_PARAMS.DEPARTURE]: '1544',
    [QUERY_PARAMS.COUNTRY]:   null,
    [QUERY_PARAMS.CATEGORY]:  Map({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
    }),
    [QUERY_PARAMS.DATES]: Map({
        from: moment().locale('ru').add(7, 'days'),
        to:   moment().locale('ru').add(14, 'days'),
    }),
    [QUERY_PARAMS.DURATION]: Map({
        from: 7,
        to:   9,
    }),
    [QUERY_PARAMS.ADULTS]:   2,
    [QUERY_PARAMS.CHILDREN]: List(),
    [QUERY_PARAMS.FOOD]:     Map({
        'uai': true,
        'ai':  true,
        'fb':  true,
        'hb':  true,
        'bb':  true,
        'ob':  true,
    }),
    [QUERY_PARAMS.TRANSPORT]: Map({
        'air':   true,
        'bus':   true,
        'train': true,
        'ship':  true,
        'no':    false,
    }),
    [QUERY_PARAMS.CITIES]:              Set(),
    [QUERY_PARAMS.HOTELS]:              Set(),
    [QUERY_PARAMS.PRICE]:               Map(),
    [QUERY_PARAMS.PAGE]:                1,
    [QUERY_PARAMS.SERVICES]:            Set(),
    [QUERY_PARAMS.SHORT]:               null,
    [QUERY_PARAMS.RATING]:              Map(),
    [QUERY_PARAMS.CURRENCY]:            null,
    [QUERY_PARAMS.OPERATORS]:           Set(),
    [QUERY_PARAMS.FLIGHT_AVAILABILITY]: Set(),
    [QUERY_PARAMS.HOTEL_AVAILABILITY]:  Set(),
    [QUERY_PARAMS.WITHOUT_SPO]:         false,
    [QUERY_PARAMS.LANGUAGE]:            null,
};

const DEFAULTS_SEARCH = {
    [QUERY_PARAMS.FOOD]: Map({
        'uai': false,
        'ai':  false,
        'fb':  false,
        'hb':  false,
        'bb':  false,
        'ob':  false,
    }),
    [QUERY_PARAMS.TRANSPORT]: Map({
        'air':   true,
        'bus':   false,
        'train': false,
        'ship':  false,
        'no':    false,
    }),
};

/**
 * Query string glue
 */
const GLUE = {
    field:    '/',
    range:    '-',
    list:     ',',
    binary:   '',
    empty:    '!',
    and:      '&',
    question: '?',
};

/**
 * Create query with params from defautls
 *
 * @param {Map} params preset params
 * @returns {OrderedMap} query
 */
function createQuery (params = {}) {
    return new OrderedMap({
        ...DEFAULTS,
    }).merge(params);
}

function createSearchQuery (params = {}) {
    const searchQuery = new OrderedMap({
        ...DEFAULTS, ...DEFAULTS_SEARCH,
    }).mergeDeep(params);

    return searchQuery.setIn(
        [QUERY_PARAMS.CATEGORY],
        searchQuery.get(QUERY_PARAMS.CATEGORY).filter((v, k) => k !== '1')
    );
}

/**
 * Create search result bones
 * @returns {Map} result
 */
function createResultBones () {
    return new Map({
        country:   null,
        hotels:    Map(),
        operators: null,
        meta:      null,
        chart:     null,
        status:    null,
        total:     0,
    });
}

/**
 * Compile query to string
 *
 * @param {OrderedMap} query query
 * @returns {string} query string
 */
function compileQuery (query) {
    const fieldsToCompilers = {
        [QUERY_PARAMS.AUTOSTART]:           numberCompiler,
        [QUERY_PARAMS.DEPARTURE]:           toStringCompiler,
        [QUERY_PARAMS.COUNTRY]:             numberCompiler,
        [QUERY_PARAMS.CITIES]:              immutableArrayCompiler,
        [QUERY_PARAMS.HOTELS]:              immutableArrayCompiler,
        [QUERY_PARAMS.CATEGORY]:            binaryCompiler,
        [QUERY_PARAMS.DATES]:               datesCompiler,
        [QUERY_PARAMS.DURATION]:            rangeCompiler,
        [QUERY_PARAMS.ADULTS]:              toStringCompiler,
        [QUERY_PARAMS.CHILDREN]:            immutableArrayCompiler,
        [QUERY_PARAMS.FOOD]:                binaryCompiler,
        [QUERY_PARAMS.TRANSPORT]:           binaryCompiler,
        [QUERY_PARAMS.PRICE]:               rangeCompiler,
        [QUERY_PARAMS.SERVICES]:            immutableArrayCompiler,
        [QUERY_PARAMS.RATING]:              rangeCompiler,
        [QUERY_PARAMS.CURRENCY]:            toStringCompiler,
        [QUERY_PARAMS.WITHOUT_SPO]:         numberCompiler,
        [QUERY_PARAMS.FLIGHT_AVAILABILITY]: immutableArrayCompiler,
        [QUERY_PARAMS.HOTEL_AVAILABILITY]:  immutableArrayCompiler,
    };

    return GLUE.field + query
        .map(
            (value, field) =>
                value && field in fieldsToCompilers
                    ? fieldsToCompilers[field](value)
                    : GLUE.empty
        )
        .toList()
        .join(GLUE.field)
        .replace(new RegExp(`[${GLUE.field}${GLUE.empty}]+$`), '');
}

function compileSearchQuery (query) {
    const fieldsToCompilers = {
        [QUERY_PARAMS.AUTOSTART]:           numberCompiler,
        [QUERY_PARAMS.DEPARTURE]:           toStringCompiler,
        [QUERY_PARAMS.COUNTRY]:             numberCompiler,
        [QUERY_PARAMS.CITIES]:              immutableArrayCompiler,
        [QUERY_PARAMS.HOTELS]:              immutableArrayCompiler,
        [QUERY_PARAMS.CATEGORY]:            binaryCompiler,
        [QUERY_PARAMS.DATES]:               datesCompiler,
        [QUERY_PARAMS.DURATION]:            rangeCompiler,
        [QUERY_PARAMS.ADULTS]:              toStringCompiler,
        [QUERY_PARAMS.CHILDREN]:            immutableArrayCompiler,
        [QUERY_PARAMS.FOOD]:                binaryCompiler,
        [QUERY_PARAMS.TRANSPORT]:           binaryCompiler,
        [QUERY_PARAMS.PRICE]:               rangeCompiler,
        [QUERY_PARAMS.SERVICES]:            immutableArrayCompiler,
        [QUERY_PARAMS.RATING]:              rangeCompiler,
        [QUERY_PARAMS.CURRENCY]:            toStringCompiler,
        [QUERY_PARAMS.WITHOUT_SPO]:         numberCompiler,
        [QUERY_PARAMS.FLIGHT_AVAILABILITY]: immutableArrayCompiler,
        [QUERY_PARAMS.HOTEL_AVAILABILITY]:  immutableArrayCompiler,
        [QUERY_PARAMS.PAGE]:                numberCompiler,
        [QUERY_PARAMS.OPERATORS]:           immutableArrayCompiler,
    };

    const startDelimeter = GLUE.question;
    const emptyDelimeter = GLUE.empty;
    const delimeter = GLUE.and;

    return startDelimeter + query
        .map(
            (value, field) => {
                const composeValue = (val) => `${[SHORT_QUERY_NAMES[field]]}=${val}`;

                const val = value && field in fieldsToCompilers
                    ? composeValue(fieldsToCompilers[field](value))
                    : composeValue(emptyDelimeter);

                return val;
            }
        )
        .toList()
        .map((v) => v.replace('!', ''))
        .join(delimeter)
        .replace(new RegExp(`[${delimeter}${emptyDelimeter}]+$`), '');
}

/**
 * Compile query to string
 *
 * @param {OrderedMap} query query
 * @returns {Object} otp query
 */
function convertToOtpQuery (query) {
    const converters = {
        [QUERY_PARAMS.DEPARTURE]: (value) => ({ 'deptCity': value }),
        [QUERY_PARAMS.COUNTRY]:   (value) => ({ 'to': value }),
        [QUERY_PARAMS.CATEGORY]:  (value) => {
            const selected = value.filter((status) => status).keySeq().toList();
            const everySelected = selected.size === DEFAULTS[QUERY_PARAMS.CATEGORY].size;

            return { 'stars': everySelected ? '' : selected.join(',') };
        },
        [QUERY_PARAMS.DATES]:               (value) => ({ 'checkIn': value.get('from').format('Y-MM-DD'), 'checkTo': value.get('to').format('Y-MM-DD') }),
        [QUERY_PARAMS.DURATION]:            (value) => ({ 'length': value.get('from'), 'lengthTo': value.get('to') }),
        [QUERY_PARAMS.ADULTS]:              (value) => ({ 'people': value }),
        [QUERY_PARAMS.CHILDREN]:            (value) => ({ 'people': value.map((age) => typeof age === 'string' ? age.replace(/\D.+/, '') : age).map(String).map((age) => age.length === 1 ? `0${age}` : age).join('') }),
        [QUERY_PARAMS.FOOD]:                (value) => ({ 'food': value.filter((status) => status).keySeq().toList().join(',') }),
        [QUERY_PARAMS.TRANSPORT]:           (value) => ({ 'transport': value.filter((status) => status).keySeq().toList().join(',') }),
        [QUERY_PARAMS.CITIES]:              (value) => ({ 'toCities': value.join(',') }),
        [QUERY_PARAMS.HOTELS]:              (value) => ({ 'toHotels': value.join(',') }),
        [QUERY_PARAMS.PRICE]:               (value) => ({ 'price': value.get('from'), 'priceTo': value.get('to') }),
        [QUERY_PARAMS.PAGE]:                (value) => ({ 'page': value }),
        [QUERY_PARAMS.SERVICES]:            (value) => ({ 'services': value.join(',') }),
        [QUERY_PARAMS.SHORT]:               (value) => ({ 'short': value }),
        [QUERY_PARAMS.RATING]:              (value) => ({ 'rate': value.isEmpty() ? null : `${value.get('from')}-${value.get('to')}` }),
        [QUERY_PARAMS.CURRENCY]:            (value) => ({ 'currency': value !== 'uah' ? value : '' }),
        [QUERY_PARAMS.OPERATORS]:           (value) => ({ 'toOperators': value.toArray() }),
        [QUERY_PARAMS.FLIGHT_AVAILABILITY]: (value) => ({ 'availableFlight': value.toArray() }),
        [QUERY_PARAMS.HOTEL_AVAILABILITY]:  (value) => ({ 'stopSale': value.toArray() }),
        [QUERY_PARAMS.WITHOUT_SPO]:         (value) => ({ 'noPromo': value }),
        [QUERY_PARAMS.LANGUAGE]:            (value) => ({ 'lang': value }),
    };

    return query
        .filter((value, param) => param in converters)
        .map((value, param) => value ? converters[param](value) : {})
        .reduce(
            (summary, values) => {
                for (const [param, value] of Object.entries(values)) {
                    value && Object.assign(summary, {
                        [param]: param in summary
                            ? summary[param] + value
                            : value,
                    });
                }

                return summary;
            },
            {}
        );
}

function parseQueryParam (currentValue, paramName, rawValue) {
    const paramsToParsers = {
        [QUERY_PARAMS.AUTOSTART]:           Boolean,
        [QUERY_PARAMS.DEPARTURE]:           Number,
        [QUERY_PARAMS.CATEGORY]:            binaryParser,
        [QUERY_PARAMS.TRANSPORT]:           binaryParser,
        [QUERY_PARAMS.FOOD]:                binaryParser,
        [QUERY_PARAMS.DATES]:               datesParser,
        [QUERY_PARAMS.DURATION]:            rangeParser,
        [QUERY_PARAMS.ADULTS]:              Number,
        [QUERY_PARAMS.CHILDREN]:            createImmutableNumbersArrayParser(List),
        [QUERY_PARAMS.COUNTRY]:             String,
        [QUERY_PARAMS.CITIES]:              createImmutableNumbersArrayParser(Set),
        [QUERY_PARAMS.HOTELS]:              createImmutableNumbersArrayParser(Set),
        [QUERY_PARAMS.PRICE]:               rangeParser,
        [QUERY_PARAMS.SERVICES]:            createImmutableArrayParser(Set),
        [QUERY_PARAMS.RATING]:              rangeParser,
        [QUERY_PARAMS.CURRENCY]:            String,
        [QUERY_PARAMS.WITHOUT_SPO]:         parseStringIntengerToBoolean,
        [QUERY_PARAMS.FLIGHT_AVAILABILITY]: createImmutableArrayParser(Set),
        [QUERY_PARAMS.HOTEL_AVAILABILITY]:  createImmutableArrayParser(Set),
        [QUERY_PARAMS.PAGE]:                Number,
        [QUERY_PARAMS.OPERATORS]:           createImmutableArrayParser(Set),
    };

    if (rawValue) {
        if (rawValue === GLUE.empty) {
            return DEFAULTS[paramName];
        }

        if (paramName in paramsToParsers) {
            return paramsToParsers[paramName](rawValue, { prevValue: currentValue });
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
function parseQueryString (queryString, baseQuery, delimeters = {}) {
    const isDelimetersEmpty = Object.keys(delimeters).length === 0;
    const query = baseQuery || (isDelimetersEmpty ? createQuery() : createSearchQuery());

    const { startDelimeter = '#/', delimeter = '/' } = delimeters;
    const params = queryString.replace(startDelimeter, '').split(delimeter);

    return query.map((currentValue, paramName) => {
        const position = query.keySeq().findIndex((f) => f === paramName);
        const rawValue = position in params ? params[position] : null;

        return rawValue
            ? parseQueryParam(currentValue, paramName, rawValue, !isDelimetersEmpty)
            : query.get(paramName, DEFAULTS[paramName]);
    });
}

function parseOSQueryHash (queryHash, baseQuery) {
    const convertListToBooleanMap = (value = '') => decodeURIComponent(value).split(',').reduce((param, key) => param.set(key, true), Map());
    const base = baseQuery || createQuery();

    return queryHash
        .replace(/^#/, '')
        .split('&')
        .map((pair) => pair.split('='))
        .reduce((query, [key, value]) => {
            switch (key) {
                case 'd':
                    return query.set(QUERY_PARAMS.DEPARTURE, Number(value));
                case 'c':
                    return query.setIn([QUERY_PARAMS.DATES, 'from'], moment(value));
                case 'v':
                    return query.setIn([QUERY_PARAMS.DATES, 'to'], moment(value));
                case 'od':
                    return query.set(QUERY_PARAMS.DATES, Map({ from: moment(value), to: moment(value) }));
                case 'l':
                case 'ol':
                    return query.set(QUERY_PARAMS.DURATION, Map({ from: Number(value), to: Number(value) }));
                case 'p':
                    return query
                        .set(QUERY_PARAMS.ADULTS, Number(value.slice(0, 1)))
                        .set(QUERY_PARAMS.CHILDREN, List(value.slice(1).match(/.{2}/g) || []).map(Number));
                case 'r':
                    return query.set(QUERY_PARAMS.TRANSPORT, convertListToBooleanMap(value));
                case 'o':
                    return query.set(QUERY_PARAMS.FOOD, convertListToBooleanMap(value));
                case 'nst':
                    return query.set(QUERY_PARAMS.NO_AGENCY_STATS, Boolean(value));
                default:
                    return query;
            }
        }, base);
}

export {
    QUERY_PARAMS,
    GLUE,
    createQuery,
    createSearchQuery,
    createResultBones,
    compileQuery,
    compileSearchQuery,
    convertToOtpQuery,
    parseOSQueryHash,
    parseQueryString
};
