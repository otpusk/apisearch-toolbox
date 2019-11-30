/* eslint-disable no-use-before-define */
// Core
import { OrderedMap } from 'immutable';
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
} from '../queries/parsers';

export class Query extends OrderedMap {
    static defaults = Object.freeze({
        page:                       1,
        departureCity:              null,
        destCountry:                [],
        destCity:                   [],
        destSight:                  [],
        dateFrom:                   moment().add(7, 'days').locale('ru'),
        dateTo:                     moment().add(14, 'days').locale('ru'),
        lengthFrom:                 4,
        lengthTo:                   8,
        opId:                       [],
        categories:                 [],
        transport:                  [],
        priceFrom:                  null,
        priceTo:                    null,
        noNightMoves:               false,
        sortPrice:                  null,
        sortLength:                 null,
        sortCitiesCnt:              null,
        sortCountriesCnt:           null,
    });

    constructor () {
        return makeQuery(OrderedMap(Query.defaults));
    }

    set (k, v) {
        return makeQuery(super.set(k, v));
    }

    setPage (page) {
        return this.set('page', page);
    }

    getPage (page) {
        return this.get('page', page);
    }

    setDeparture (value) {
        return this.set('departureCity', value);
    }

    getDeparture () {
        return this.get('departureCity');
    }

    setLocations (locations) {
        const { countries, cities, sights } = locations.reduce((geos, { type, id }) => {
            geos[type] = [...geos[type], id];

            return geos;
        }, { countries: [], cities: [], sights: []});

        return this
            .set('destCountry', countries)
            .set('destCity', cities)
            .set('destSight', sights);
    }

    getLocations () {
        return [
            ...this.get('destCountry', []).map((id) => ({ id, type: 'countries' })),
            ...this.get('destCity', []).map((id) => ({ id, type: 'cities' })),
            ...this.get('destSight', []).map((id) => ({ id, type: 'sights' }))
        ];
    }

    setDates ({ from, to }) {
        return this.set('dateFrom', from).set('dateTo', to);
    }

    getDates () {
        return {
            from: this.get('dateFrom'),
            to:   this.get('dateTo'),
        };
    }

    setDuration ({ from, to }) {
        return this.set('lengthFrom', from).set('lengthTo', to);
    }

    getDuration () {
        return {
            from: this.get('lengthFrom'),
            to:   this.get('lengthTo'),
        };
    }

    setOperators (operators) {
        return this.set('opId', operators);
    }

    getOperators () {
        return this.get('opId');
    }

    setCategories (categories) {
        return this.set('categories', categories);
    }

    getCategories () {
        return this.get('categories');
    }

    setTransport (transport) {
        return this.set('transport', transport);
    }

    getTransport () {
        return this.get('transport');
    }

    setPrice ({ from, to }) {
        return this.set('priceFrom', from).set('priceTo', to);
    }

    getPrice () {
        return {
            from: this.get('priceFrom'),
            to:   this.get('priceTo'),
        };
    }

    setWithoutNightTransfer (flag) {
        return this.set('noNightMoves', flag);
    }

    isWithoutNightTransfer () {
        return this.get('noNightMoves');
    }

    setSortsOrder (sorts) {

        const {
            price = null,
            length = null,
            citiesCount = null,
            countriesCount = null
        } = sorts;

        return this
            .set('sortPrice', price)
            .set('sortLength', length)
            .set('sortCitiesCnt', citiesCount)
            .set('sortCountriesCnt', countriesCount);

    }

    getSortsOrder () {
        return {
            price: this.get('sortPrice'),
            length: this.get('sortLength'),
            citiesCount: this.get('sortCitiesCnt'),
            countriesCount: this.get('sortCountriesCnt')
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
        page:             numberCompiler,
        departureCity:    numberCompiler,
        destCountry:      immutableArrayCompiler,
        destCity:         immutableArrayCompiler,
        destSight:        immutableArrayCompiler,
        date:             datesCompiler,
        length:           rangeCompiler,
        opId:             immutableArrayCompiler,
        categories:       immutableArrayCompiler,
        transport:        immutableArrayCompiler,
        price:            rangeCompiler,
        noNightMoves:     toStringCompiler,
        sortPrice:        toStringCompiler,
        sortLength:       toStringCompiler,
        sortCitiesCnt:    toStringCompiler,
        sortCountriesCnt: toStringCompiler,
    };

    const exceptions = ['dateFrom', 'lengthFrom', 'priceFrom'];

    return GLUE.field + query
        .map((value, field) => {
            if (field in fieldsToCompilers || exceptions.includes(field)) {
                // date
                if (field === 'dateFrom') {
                    const fieldName = field.slice(0, -4);
                    const date = new Map();
                    date.set('from', value);
                    date.set('to', query.get(fieldName + 'To'));
                    return fieldsToCompilers[fieldName](date);
                }

                // range
                if (field === 'lengthFrom' || field === 'priceFrom') {
                    const fieldName = field.slice(0, -4);
                    const range = {from: value, to: query.get(fieldName + 'To')};
                    return fieldsToCompilers[fieldName](range);
                }

                if (value) {
                    return fieldsToCompilers[field](value);
                }
            }
            return null;
        })
        .toList()
        .filter((e) => !!e)
        .join(GLUE.field)
        .replace(new RegExp(`[${GLUE.field}${GLUE.empty}]+$`), '');
}
