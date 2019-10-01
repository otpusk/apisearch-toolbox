/* eslint-disable no-use-before-define */
// Core
import { OrderedMap } from 'immutable';
import moment from 'moment';

export class Query extends OrderedMap {
    static defaults = Object.freeze({
        departure:   null,
        destCountry: [],
        destCity:    [],
        destSight:   [],
        dateFrom:    moment().add(7, 'days').locale('ru'),
        dateTo:      moment().add(14, 'days').locale('ru'),
        lengthFrom:  4,
        lengthTo:    8,
        operators:   [],
    });

    constructor () {
        return makeQuery(OrderedMap(Query.defaults));
    }

    set (k, v) {
        return makeQuery(super.set(k, v));
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
        return this.set('operators', operators);
    }
    getOperators () {
        return this.get('operators');
    }
}

function makeQuery (orderedMap) {
    const query = Object.create(Query.prototype);

    query.size = orderedMap.size;
    query._map = orderedMap._map;
    query._list = orderedMap._list;

    return query;
}
