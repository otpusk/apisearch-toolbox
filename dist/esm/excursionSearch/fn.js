function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable no-use-before-define */
// Core
import { OrderedMap } from 'immutable';
import moment from 'moment';

// Instruments
import { arrayCompiler, dateCompiler, numberCompiler, toStringCompiler } from './compilers';
import { dateParser, numbersArrayParser, arrayParser } from './parsers';

/**
 * Query string glue
 */
export const GLUE = {
  field: '/',
  range: '-',
  list: ',',
  binary: '',
  empty: '!'
};
export class Query extends OrderedMap {
  constructor(query) {
    if (query) {
      return makeQuery(query);
    }
    return makeQuery(OrderedMap(Query.defaults));
  }
  set(k, v) {
    return makeQuery(super.set(k, v));
  }
  map(k, v) {
    return makeQuery(super.map(k, v));
  }
  setPage(page) {
    return this.set('page', page);
  }
  getPage(page) {
    return this.get('page', page);
  }
  setDeparture(value) {
    return this.set('departureCity', value);
  }
  getDeparture() {
    return this.get('departureCity');
  }
  setLocations(locations) {
    const {
      countries,
      cities,
      sights
    } = locations.reduce((geos, _ref) => {
      let {
        type,
        id
      } = _ref;
      geos[type] = [...geos[type], id];
      return geos;
    }, {
      countries: [],
      cities: [],
      sights: []
    });
    return this.set('destCountry', countries).set('destCity', cities).set('destSight', sights);
  }
  getLocations() {
    return [...this.get('destCountry', []).map(id => ({
      id,
      type: 'countries'
    })), ...this.get('destCity', []).map(id => ({
      id,
      type: 'cities'
    })), ...this.get('destSight', []).map(id => ({
      id,
      type: 'sights'
    }))];
  }
  setDates(_ref2) {
    let {
      from,
      to
    } = _ref2;
    return this.set('dateFrom', from).set('dateTo', to);
  }
  getDates() {
    return {
      from: this.get('dateFrom'),
      to: this.get('dateTo')
    };
  }
  setDuration(_ref3) {
    let {
      from,
      to
    } = _ref3;
    return this.set('lengthFrom', from).set('lengthTo', to);
  }
  getDuration() {
    return {
      from: this.get('lengthFrom'),
      to: this.get('lengthTo')
    };
  }
  setOperators(operators) {
    return this.set('opId', operators);
  }
  getOperators() {
    return this.get('opId');
  }
  setCategories(categories) {
    return this.set('categories', categories);
  }
  getCategories() {
    return this.get('categories');
  }
  setTransport(transport) {
    return this.set('transport', transport);
  }
  getTransport() {
    return this.get('transport');
  }
  setPrice(_ref4) {
    let {
      from,
      to
    } = _ref4;
    return this.set('priceFrom', from).set('priceTo', to);
  }
  getPrice() {
    return {
      from: this.get('priceFrom'),
      to: this.get('priceTo')
    };
  }
  setWithoutNightTransfer(flag) {
    return this.set('noNightMoves', flag);
  }
  isWithoutNightTransfer() {
    return this.get('noNightMoves');
  }
  setSortsOrder(sorts) {
    const {
      price = null,
      length = null,
      citiesCount = null,
      countriesCount = null
    } = sorts;
    return this.set('sortPrice', price).set('sortLength', length).set('sortCitiesCnt', citiesCount).set('sortCountriesCnt', countriesCount);
  }
  getSortsOrder() {
    return {
      price: this.get('sortPrice'),
      length: this.get('sortLength'),
      citiesCount: this.get('sortCitiesCnt'),
      countriesCount: this.get('sortCountriesCnt')
    };
  }
  compileQuery() {
    const fieldsToCompilers = {
      page: numberCompiler,
      departureCity: numberCompiler,
      destCountry: arrayCompiler,
      destCity: arrayCompiler,
      destSight: arrayCompiler,
      dateFrom: dateCompiler,
      dateTo: dateCompiler,
      lengthFrom: numberCompiler,
      lengthTo: numberCompiler,
      opId: arrayCompiler,
      categories: arrayCompiler,
      transport: arrayCompiler,
      priceFrom: numberCompiler,
      priceTo: numberCompiler,
      noNightMoves: toStringCompiler,
      sortPrice: toStringCompiler,
      sortLength: toStringCompiler,
      sortCitiesCnt: toStringCompiler,
      sortCountriesCnt: toStringCompiler
    };
    return GLUE.field + this.map((value, field) => value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty).toList().join(GLUE.field).replace(new RegExp(`[${GLUE.field}${GLUE.empty}]+$`), '');
  }
  parseQueryParam(currentValue, paramName, rawValue) {
    const paramsToParsers = {
      page: Number,
      departureCity: Number,
      destCountry: numbersArrayParser,
      destCity: numbersArrayParser,
      destSight: numbersArrayParser,
      dateFrom: dateParser,
      dateTo: dateParser,
      lengthFrom: Number,
      lengthTo: Number,
      opId: numbersArrayParser,
      categories: numbersArrayParser,
      transport: arrayParser,
      priceFrom: Number,
      priceTo: Number,
      noNightMoves: Number,
      sortPrice: String,
      sortLength: String,
      sortCitiesCnt: String,
      sortCountriesCnt: String
    };
    if (rawValue) {
      if (rawValue === GLUE.empty) {
        return Query.defaults[paramName];
      }
      if (paramName in paramsToParsers) {
        return paramsToParsers[paramName](rawValue, {
          prevValue: currentValue
        });
      }
    }
    return currentValue;
  }
  parseQueryString(queryString) {
    const query = makeQuery(OrderedMap(Query.defaults));
    const params = queryString.replace('#/', '').split('/');
    return query.map((currentValue, paramName) => {
      const position = query.keySeq().findIndex(f => f === paramName);
      const rawValue = position in params ? params[position] : null;
      return rawValue ? this.parseQueryParam(currentValue, paramName, rawValue) : currentValue;
    });
  }
}
_defineProperty(Query, "defaults", Object.freeze({
  page: 1,
  departureCity: null,
  destCountry: [],
  destCity: [],
  destSight: [],
  dateFrom: moment().add(7, 'days').locale('ru').format('YYYY-MM-DD'),
  dateTo: moment().add(14, 'days').locale('ru').format('YYYY-MM-DD'),
  lengthFrom: 1,
  lengthTo: null,
  opId: [],
  categories: [],
  transport: [],
  priceFrom: null,
  priceTo: null,
  noNightMoves: false,
  sortPrice: null,
  sortLength: null,
  sortCitiesCnt: null,
  sortCountriesCnt: null
}));
function makeQuery(orderedMap) {
  const query = Object.create(Query.prototype);
  query.size = orderedMap.size;
  query._map = orderedMap._map;
  query._list = orderedMap._list;
  return query;
}