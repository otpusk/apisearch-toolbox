/* eslint-disable no-use-before-define */
// Core
import { OrderedMap } from 'immutable';
import moment from 'moment';

export class Query extends OrderedMap {
    static defaults = Object.freeze({
        departure: null,
        locations: [],
        dates:     {
            from: moment().add(7, 'days').locale('ru'),
            to:   moment().add(14, 'days').locale('ru'),
        },
        duration: {
            from: 4,
            to:   8,
        },
    });

    constructor () {
        return makeQuery(OrderedMap(Query.defaults));
    }

    set (k, v) {
        return makeQuery(super.set(k, v));
    }

    setDeparture (value) {
        return this.set('departure', value);
    }
    getDeparture () {
        return this.get('departure');
    }

    setLocations (value) {
        return this.set('locations', value);
    }
    getLocations () {
        return this.get('locations');
    }

    setDates (value) {
        return this.set('dates', value);
    }
    getDates () {
        return this.get('dates');
    }

    setDuration (value) {
        return this.set('duration', value);
    }
    getDuration () {
        return this.get('duration');
    }
}

function makeQuery (orderedMap) {
    const query = Object.create(Query.prototype);

    query.size = orderedMap.size;
    query._map = orderedMap._map;
    query._list = orderedMap._list;

    return query;
}
