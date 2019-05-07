// Core
import { OrderedMap, Map, Set, List } from 'immutable';
import moment from 'moment';

// Instruments
import {
    binaryCompiler,
    rangeCompiler,
    datesCompiler,
    arrayCompiler,
    numberCompiler,
    toStringCompiler
} from './compilers';

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
};

/**
 * Query defaults
 */
const DEFAULTS = {
    [QUERY_PARAMS.AUTOSTART]: false,
    [QUERY_PARAMS.DEPARTURE]: '1544',
    [QUERY_PARAMS.COUNTRY]:   null,
    [QUERY_PARAMS.CATEGORY]:  Map({
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
    [QUERY_PARAMS.FLIGHT_AVAILABILITY]: Set(['yes', 'request']),
    [QUERY_PARAMS.HOTEL_AVAILABILITY]:  Set(['yes', 'request']),
    [QUERY_PARAMS.WITHOUT_SPO]:         false,
    [QUERY_PARAMS.LANGUAGE]:            null,
};

/**
 * Query string glue
 */
const GLUE = {
    field:  '/',
    range:  '-',
    list:   ',',
    binary: '',
    empty:  '!',
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
        ...params,
    });
}

/**
 * Create search result bones
 * @returns {Map} result
 */
function createResultBones () {
    return new Map({
        country:   null,
        hotels:    Map(),
        operators: Map(),
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
        [QUERY_PARAMS.AUTOSTART]: numberCompiler,
        [QUERY_PARAMS.DEPARTURE]: toStringCompiler,
        [QUERY_PARAMS.COUNTRY]:   numberCompiler,
        [QUERY_PARAMS.CITIES]:    arrayCompiler,
        [QUERY_PARAMS.HOTELS]:    arrayCompiler,
        [QUERY_PARAMS.CATEGORY]:  binaryCompiler,
        [QUERY_PARAMS.DATES]:     datesCompiler,
        [QUERY_PARAMS.DURATION]:  rangeCompiler,
        [QUERY_PARAMS.ADULTS]:    toStringCompiler,
        [QUERY_PARAMS.CHILDREN]:  arrayCompiler,
        [QUERY_PARAMS.FOOD]:      binaryCompiler,
        [QUERY_PARAMS.TRANSPORT]: binaryCompiler,
        [QUERY_PARAMS.PRICE]:     rangeCompiler,
        [QUERY_PARAMS.SERVICES]:  arrayCompiler,
        [QUERY_PARAMS.RATING]:    rangeCompiler,
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

/**
 * Compile query to string
 *
 * @param {OrderedMap} query query
 * @returns {Object} otp query
 */
function convertToOtpQuery (query) {
    const converters = {
        [QUERY_PARAMS.DEPARTURE]:           (value) => ({ 'deptCity': value }),
        [QUERY_PARAMS.COUNTRY]:             (value) => ({ 'to': value }),
        [QUERY_PARAMS.CATEGORY]:            (value) => ({ 'stars': value.filter((status) => status).keySeq().toList().join(',') }),
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
        [QUERY_PARAMS.CURRENCY]:            (value) => ({ 'currency': value }),
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

function parseOSQueryHash (queryHash) {
    const convertListToBooleanMap = (value = '') => decodeURIComponent(value).split(',').reduce((param, key) => param.set(key, true), Map());
    const params = queryHash
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
                        .set(QUERY_PARAMS.CHILDREN, (value.slice(1).match(/.{2}/g) || []).map(Number));
                case 'r':
                    return query.set(QUERY_PARAMS.TRANSPORT, convertListToBooleanMap(value));
                case 'o':
                    return query.set(QUERY_PARAMS.FOOD, convertListToBooleanMap(value));
                default:
                    return query;
            }
        }, createQuery());

    return params;
}

export {
    QUERY_PARAMS,
    GLUE,
    createQuery,
    createResultBones,
    compileQuery,
    convertToOtpQuery,
    parseOSQueryHash
};
