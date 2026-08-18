"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = exports.GLUE = void 0;
var _immutable = require("immutable");
var _moment = _interopRequireDefault(require("moment"));
var _compilers = require("./compilers");
var _parsers = require("./parsers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-use-before-define */ // Core
// Instruments
/**
 * Query string glue
 */
const GLUE = exports.GLUE = {
  field: '/',
  range: '-',
  list: ',',
  binary: '',
  empty: '!'
};
class Query extends _immutable.OrderedMap {
  constructor(query) {
    if (query) {
      return makeQuery(query);
    }
    return makeQuery((0, _immutable.OrderedMap)(Query.defaults));
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
      page: _compilers.numberCompiler,
      departureCity: _compilers.numberCompiler,
      destCountry: _compilers.arrayCompiler,
      destCity: _compilers.arrayCompiler,
      destSight: _compilers.arrayCompiler,
      dateFrom: _compilers.dateCompiler,
      dateTo: _compilers.dateCompiler,
      lengthFrom: _compilers.numberCompiler,
      lengthTo: _compilers.numberCompiler,
      opId: _compilers.arrayCompiler,
      categories: _compilers.arrayCompiler,
      transport: _compilers.arrayCompiler,
      priceFrom: _compilers.numberCompiler,
      priceTo: _compilers.numberCompiler,
      noNightMoves: _compilers.toStringCompiler,
      sortPrice: _compilers.toStringCompiler,
      sortLength: _compilers.toStringCompiler,
      sortCitiesCnt: _compilers.toStringCompiler,
      sortCountriesCnt: _compilers.toStringCompiler
    };
    return GLUE.field + this.map((value, field) => value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty).toList().join(GLUE.field).replace(new RegExp(`[${GLUE.field}${GLUE.empty}]+$`), '');
  }
  parseQueryParam(currentValue, paramName, rawValue) {
    const paramsToParsers = {
      page: Number,
      departureCity: Number,
      destCountry: _parsers.numbersArrayParser,
      destCity: _parsers.numbersArrayParser,
      destSight: _parsers.numbersArrayParser,
      dateFrom: _parsers.dateParser,
      dateTo: _parsers.dateParser,
      lengthFrom: Number,
      lengthTo: Number,
      opId: _parsers.numbersArrayParser,
      categories: _parsers.numbersArrayParser,
      transport: _parsers.arrayParser,
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
    const query = makeQuery((0, _immutable.OrderedMap)(Query.defaults));
    const params = queryString.replace('#/', '').split('/');
    return query.map((currentValue, paramName) => {
      const position = query.keySeq().findIndex(f => f === paramName);
      const rawValue = position in params ? params[position] : null;
      return rawValue ? this.parseQueryParam(currentValue, paramName, rawValue) : currentValue;
    });
  }
}
exports.Query = Query;
_defineProperty(Query, "defaults", Object.freeze({
  page: 1,
  departureCity: null,
  destCountry: [],
  destCity: [],
  destSight: [],
  dateFrom: (0, _moment.default)().add(7, 'days').locale('ru').format('YYYY-MM-DD'),
  dateTo: (0, _moment.default)().add(14, 'days').locale('ru').format('YYYY-MM-DD'),
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