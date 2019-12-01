/* eslint-disable no-use-before-define */
// Core
import { OrderedMap } from 'immutable';
import moment from 'moment';

// Instruments
import {
    arrayCompiler,
    dateCompiler,
    numberCompiler,
    toStringCompiler,
} from './compilers';

import {
    dateParser,
    parseStringIntengerToBoolean,
    numbersArrayParser,
    arrayParser,
} from './parsers';

const QUERY_PARAMS = {
    PAGE:               'page',
    DEPARTURE_CITY:     'departureCity',
    DEST_COUNTRY:       'destCountry',
    DEST_CITY:          'destCity',
    DEST_SIGHT:         'destSight',
    DATE_FROM:          'dateFrom',
    DATE_TO:            'dateTo',
    LENGTH_FROM:        'lengthFrom',
    LENGTH_TO:          'lengthTo',
    OP_ID:              'opId',
    CATEGORIES:         'categories',
    TRANSPORT:          'transport',
    PRICE_FROM:         'priceFrom',
    PRICE_TO:           'priceTo',
    NO_NIGHT_MOVES:     'noNightMoves',
    SORT_PRICE:         'sortPrice',
    SORT_LENGTH:        'sortLength',
    SORT_CITIES_CNT:    'sortCitiesCnt',
    SORT_COUNTRIES_CNT: 'sortCountriesCnt',
}

export class Query extends OrderedMap {
    static defaults = Object.freeze({
        [QUERY_PARAMS.PAGE]:               1,
        [QUERY_PARAMS.DEPARTURE_CITY]:     null,
        [QUERY_PARAMS.DEST_COUNTRY]:       [],
        [QUERY_PARAMS.DEST_CITY]:          [],
        [QUERY_PARAMS.DEST_SIGHT]:         [],
        [QUERY_PARAMS.DATE_FROM]:          moment().add(7, 'days').locale('ru'),
        [QUERY_PARAMS.DATE_TO]:            moment().add(14, 'days').locale('ru'),
        [QUERY_PARAMS.LENGTH_FROM]:        4,
        [QUERY_PARAMS.LENGTH_TO]:          8,
        [QUERY_PARAMS.OP_ID]:              [],
        [QUERY_PARAMS.CATEGORIES]:         [],
        [QUERY_PARAMS.TRANSPORT]:          [],
        [QUERY_PARAMS.PRICE_FROM]:         null,
        [QUERY_PARAMS.PRICE_TO]:           null,
        [QUERY_PARAMS.NO_NIGHT_MOVES]:     false,
        [QUERY_PARAMS.SORT_PRICE]:         null,
        [QUERY_PARAMS.SORT_LENGTH]:        null,
        [QUERY_PARAMS.SORT_CITIES_CNT]:    null,
        [QUERY_PARAMS.SORT_COUNTRIES_CNT]: null,
    });

    constructor () {
        return makeQuery(OrderedMap(Query.defaults));
    }

    set (k, v) {
        return makeQuery(super.set(k, v));
    }

    setPage (page) {
        return this.set(QUERY_PARAMS.PAGE, page);
    }

    getPage (page) {
        return this.get(QUERY_PARAMS.PAGE, page);
    }

    setDeparture (value) {
        return this.set(QUERY_PARAMS.DEPARTURE_CITY, value);
    }

    getDeparture () {
        return this.get(QUERY_PARAMS.DEPARTURE_CITY);
    }

    setLocations (locations) {
        const { countries, cities, sights } = locations.reduce((geos, { type, id }) => {
            geos[type] = [...geos[type], id];

            return geos;
        }, { countries: [], cities: [], sights: []});

        return this
            .set(QUERY_PARAMS.DEST_COUNTRY, countries)
            .set(QUERY_PARAMS.DEST_CITY, cities)
            .set(QUERY_PARAMS.DEST_SIGHT, sights);
    }

    getLocations () {
        return [
            ...this.get(QUERY_PARAMS.DEST_COUNTRY, []).map((id) => ({ id, type: 'countries' })),
            ...this.get(QUERY_PARAMS.DEST_CITY, []).map((id) => ({ id, type: 'cities' })),
            ...this.get(QUERY_PARAMS.DEST_SIGHT, []).map((id) => ({ id, type: 'sights' }))
        ];
    }

    setDates ({ from, to }) {
        return this.set(QUERQUERY_PARAMS.DATE_FROM, from).set(QUERY_PARAMS.DATE_TO, to);
    }

    getDates () {
        return {
            from: this.get(QUERY_PARAMS.DATE_FROM),
            to:   this.get(QUERY_PARAMS.DATE_TO),
        };
    }

    setDuration ({ from, to }) {
        return this.set(QUERY_PARAMS.LENGTH_FROM, from).set(QUERY_PARAMS.LENGTH_TO, to);
    }

    getDuration () {
        return {
            from: this.get(QUERY_PARAMS.LENGTH_FROM),
            to:   this.get(QUERY_PARAMS.LENGTH_TO),
        };
    }

    setOperators (operators) {
        return this.set(QUERY_PARAMS.OP_ID, operators);
    }

    getOperators () {
        return this.get(QUERY_PARAMS.OP_ID);
    }

    setCategories (categories) {
        return this.set(QUERY_PARAMS.CATEGORIES, categories);
    }

    getCategories () {
        return this.get(QUERY_PARAMS.CATEGORIES);
    }

    setTransport (transport) {
        return this.set(QUERY_PARAMS.TRANSPORT, transport);
    }

    getTransport () {
        return this.get(QUERY_PARAMS.TRANSPORT);
    }

    setPrice ({ from, to }) {
        return this.set(QUERY_PARAMS.PRICE_FROM, from).set(QUERY_PARAMS.PRICE_TO, to);
    }

    getPrice () {
        return {
            from: this.get(QUERY_PARAMS.PRICE_FROM),
            to:   this.get(QUERY_PARAMS.PRICE_TO),
        };
    }

    setWithoutNightTransfer (flag) {
        return this.set(QUERY_PARAMS.NO_NIGHT_MOVES, flag);
    }

    isWithoutNightTransfer () {
        return this.get(QUERY_PARAMS.NO_NIGHT_MOVES);
    }

    setSortsOrder (sorts) {

        const {
            price = null,
            length = null,
            citiesCount = null,
            countriesCount = null
        } = sorts;

        return this
            .set(QUERY_PARAMS.SORT_PRICE, price)
            .set(QUERY_PARAMS.SORT_LENGTH, length)
            .set(QUERY_PARAMS.SORT_CITIES_CNT, citiesCount)
            .set(QUERY_PARAMS.SORT_COUNTRIES_CNT, countriesCount);

    }

    getSortsOrder () {
        return {
            price:          this.get(QUERY_PARAMS.SORT_PRICE),
            length:         this.get(QUERY_PARAMS.SORT_LENGTH),
            citiesCount:    this.get(QUERY_PARAMS.SORT_CITIES_CNT),
            countriesCount: this.get(QUERY_PARAMS.SORT_COUNTRIES_CNT)
        }
    }
}

/**
 * Query string flue
 */
export const GLUE = {
    field: '/',
    range: '-',
    list: ',',
    binary: '',
    empty: '!',
}

function makeQuery (orderedMap) {
    const query = Object.create(Query.prototype);

    query.size = orderedMap.size;
    query._map = orderedMap._map;
    query._list = orderedMap._list;

    return query;
}

/**
 * Compile query to string
 *
 * @param {OrderedMap} query query
 * @returns {string} query string
 */

export function compileQuery (query) {
    const fieldsToCompilers = {
        [QUERY_PARAMS.PAGE]:               numberCompiler,
        [QUERY_PARAMS.DEPARTURE_CITY]:     numberCompiler,
        [QUERY_PARAMS.DEST_COUNTRY]:       arrayCompiler,
        [QUERY_PARAMS.DEST_CITY]:          arrayCompiler,
        [QUERY_PARAMS.DEST_SIGHT]:         arrayCompiler,
        [QUERY_PARAMS.DATE_FROM]:          dateCompiler,
        [QUERY_PARAMS.DATE_TO]:            dateCompiler,
        [QUERY_PARAMS.LENGTH_FROM]:        numberCompiler,
        [QUERY_PARAMS.LENGTH_TO]:          numberCompiler,
        [QUERY_PARAMS.OP_ID]:              arrayCompiler,
        [QUERY_PARAMS.CATEGORIES]:         arrayCompiler,
        [QUERY_PARAMS.TRANSPORT]:          arrayCompiler,
        [QUERY_PARAMS.PRICE_FROM]:         numberCompiler,
        [QUERY_PARAMS.PRICE_TO]:           numberCompiler,
        [QUERY_PARAMS.NO_NIGHT_MOVES]:     toStringCompiler,
        [QUERY_PARAMS.SORT_PRICE]:         toStringCompiler,
        [QUERY_PARAMS.SORT_LENGTH]:        toStringCompiler,
        [QUERY_PARAMS.SORT_CITIES_CNT]:    toStringCompiler,
        [QUERY_PARAMS.SORT_COUNTRIES_CNT]: toStringCompiler,
    };

    return GLUE.field + query.map
        ((value, field) => (
            value && field in fieldsToCompilers
                ? fieldsToCompilers[field](value)
                : GLUE.empty
        ))
        .toList()
        .join(GLUE.field)
        .replace(new RegExp(`[${GLUE.field}${GLUE.empty}]+$`), '');
}

export function parseQueryParam (currentValue, paramName, rawValue) {
    const paramsToParsers = {
        [QUERY_PARAMS.PAGE]:               Number,
        [QUERY_PARAMS.DEPARTURE_CITY]:     Number,
        [QUERY_PARAMS.DEST_COUNTRY]:       numbersArrayParser,
        [QUERY_PARAMS.DEST_CITY]:          numbersArrayParser,
        [QUERY_PARAMS.DEST_SIGHT]:         numbersArrayParser,
        [QUERY_PARAMS.DATE_FROM]:          dateParser,
        [QUERY_PARAMS.DATE_TO]:            dateParser,
        [QUERY_PARAMS.LENGTH_FROM]:        Number,
        [QUERY_PARAMS.LENGTH_TO]:          Number,
        [QUERY_PARAMS.OP_ID]:              numbersArrayParser,
        [QUERY_PARAMS.CATEGORIES]:         numbersArrayParser,
        [QUERY_PARAMS.TRANSPORT]:          numbersArrayParser,
        [QUERY_PARAMS.PRICE_FROM]:         Number,
        [QUERY_PARAMS.PRICE_TO]:           Number,
        [QUERY_PARAMS.NO_NIGHT_MOVES]:     Number,
        [QUERY_PARAMS.SORT_PRICE]:         String,
        [QUERY_PARAMS.SORT_LENGTH]:        String,
        [QUERY_PARAMS.SORT_CITIES_CNT]:    String,
        [QUERY_PARAMS.SORT_COUNTRIES_CNT]: String,
    };

    if (rawValue) {
        if (rawValue === GLUE.empty) {
            return Query.defaults[paramName];
        }

        if (paramName in paramsToParsers) {
            return paramsToParsers[paramName](rawValue, { prevValue: currentValue });
        }
    }

    return currentValue;
}

export function parseQueryString (queryString) {
    const query = makeQuery(OrderedMap(Query.defaults));
    const params = queryString.replace('#/', '').split('/');

    return query.map((currentValue, paramName) => {
        const position = query.keySeq().findIndex((f) => f === paramName);
        const rawValue = position in params ? params[position] : null;

        return rawValue
            ? parseQueryParam(currentValue, paramName, rawValue)
            : currentValue;
    });
}
