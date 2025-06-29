"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = exports.GLUE = void 0;
var _immutable = require("immutable");
var _moment = _interopRequireDefault(require("moment"));
var _compilers = require("./compilers");
var _parsers = require("./parsers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-use-before-define */ // Core
// Instruments
/**
 * Query string glue
 */
var GLUE = exports.GLUE = {
  field: '/',
  range: '-',
  list: ',',
  binary: '',
  empty: '!'
};
var Query = exports.Query = /*#__PURE__*/function (_OrderedMap) {
  function Query(query) {
    var _this;
    _classCallCheck(this, Query);
    if (query) {
      return _possibleConstructorReturn(_this, makeQuery(query));
    }
    return _possibleConstructorReturn(_this, makeQuery((0, _immutable.OrderedMap)(Query.defaults)));
  }
  _inherits(Query, _OrderedMap);
  return _createClass(Query, [{
    key: "set",
    value: function set(k, v) {
      return makeQuery(_get(_getPrototypeOf(Query.prototype), "set", this).call(this, k, v));
    }
  }, {
    key: "map",
    value: function map(k, v) {
      return makeQuery(_get(_getPrototypeOf(Query.prototype), "map", this).call(this, k, v));
    }
  }, {
    key: "setPage",
    value: function setPage(page) {
      return this.set('page', page);
    }
  }, {
    key: "getPage",
    value: function getPage(page) {
      return this.get('page', page);
    }
  }, {
    key: "setDeparture",
    value: function setDeparture(value) {
      return this.set('departureCity', value);
    }
  }, {
    key: "getDeparture",
    value: function getDeparture() {
      return this.get('departureCity');
    }
  }, {
    key: "setLocations",
    value: function setLocations(locations) {
      var _locations$reduce = locations.reduce(function (geos, _ref) {
          var type = _ref.type,
            id = _ref.id;
          geos[type] = [].concat(_toConsumableArray(geos[type]), [id]);
          return geos;
        }, {
          countries: [],
          cities: [],
          sights: []
        }),
        countries = _locations$reduce.countries,
        cities = _locations$reduce.cities,
        sights = _locations$reduce.sights;
      return this.set('destCountry', countries).set('destCity', cities).set('destSight', sights);
    }
  }, {
    key: "getLocations",
    value: function getLocations() {
      return [].concat(_toConsumableArray(this.get('destCountry', []).map(function (id) {
        return {
          id: id,
          type: 'countries'
        };
      })), _toConsumableArray(this.get('destCity', []).map(function (id) {
        return {
          id: id,
          type: 'cities'
        };
      })), _toConsumableArray(this.get('destSight', []).map(function (id) {
        return {
          id: id,
          type: 'sights'
        };
      })));
    }
  }, {
    key: "setDates",
    value: function setDates(_ref2) {
      var from = _ref2.from,
        to = _ref2.to;
      return this.set('dateFrom', from).set('dateTo', to);
    }
  }, {
    key: "getDates",
    value: function getDates() {
      return {
        from: this.get('dateFrom'),
        to: this.get('dateTo')
      };
    }
  }, {
    key: "setDuration",
    value: function setDuration(_ref3) {
      var from = _ref3.from,
        to = _ref3.to;
      return this.set('lengthFrom', from).set('lengthTo', to);
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return {
        from: this.get('lengthFrom'),
        to: this.get('lengthTo')
      };
    }
  }, {
    key: "setOperators",
    value: function setOperators(operators) {
      return this.set('opId', operators);
    }
  }, {
    key: "getOperators",
    value: function getOperators() {
      return this.get('opId');
    }
  }, {
    key: "setCategories",
    value: function setCategories(categories) {
      return this.set('categories', categories);
    }
  }, {
    key: "getCategories",
    value: function getCategories() {
      return this.get('categories');
    }
  }, {
    key: "setTransport",
    value: function setTransport(transport) {
      return this.set('transport', transport);
    }
  }, {
    key: "getTransport",
    value: function getTransport() {
      return this.get('transport');
    }
  }, {
    key: "setPrice",
    value: function setPrice(_ref4) {
      var from = _ref4.from,
        to = _ref4.to;
      return this.set('priceFrom', from).set('priceTo', to);
    }
  }, {
    key: "getPrice",
    value: function getPrice() {
      return {
        from: this.get('priceFrom'),
        to: this.get('priceTo')
      };
    }
  }, {
    key: "setWithoutNightTransfer",
    value: function setWithoutNightTransfer(flag) {
      return this.set('noNightMoves', flag);
    }
  }, {
    key: "isWithoutNightTransfer",
    value: function isWithoutNightTransfer() {
      return this.get('noNightMoves');
    }
  }, {
    key: "setSortsOrder",
    value: function setSortsOrder(sorts) {
      var _sorts$price = sorts.price,
        price = _sorts$price === void 0 ? null : _sorts$price,
        _sorts$length = sorts.length,
        length = _sorts$length === void 0 ? null : _sorts$length,
        _sorts$citiesCount = sorts.citiesCount,
        citiesCount = _sorts$citiesCount === void 0 ? null : _sorts$citiesCount,
        _sorts$countriesCount = sorts.countriesCount,
        countriesCount = _sorts$countriesCount === void 0 ? null : _sorts$countriesCount;
      return this.set('sortPrice', price).set('sortLength', length).set('sortCitiesCnt', citiesCount).set('sortCountriesCnt', countriesCount);
    }
  }, {
    key: "getSortsOrder",
    value: function getSortsOrder() {
      return {
        price: this.get('sortPrice'),
        length: this.get('sortLength'),
        citiesCount: this.get('sortCitiesCnt'),
        countriesCount: this.get('sortCountriesCnt')
      };
    }
  }, {
    key: "compileQuery",
    value: function compileQuery() {
      var fieldsToCompilers = {
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
      return GLUE.field + this.map(function (value, field) {
        return value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty;
      }).toList().join(GLUE.field).replace(new RegExp("[".concat(GLUE.field).concat(GLUE.empty, "]+$")), '');
    }
  }, {
    key: "parseQueryParam",
    value: function parseQueryParam(currentValue, paramName, rawValue) {
      var paramsToParsers = {
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
  }, {
    key: "parseQueryString",
    value: function parseQueryString(queryString) {
      var _this2 = this;
      var query = makeQuery((0, _immutable.OrderedMap)(Query.defaults));
      var params = queryString.replace('#/', '').split('/');
      return query.map(function (currentValue, paramName) {
        var position = query.keySeq().findIndex(function (f) {
          return f === paramName;
        });
        var rawValue = position in params ? params[position] : null;
        return rawValue ? _this2.parseQueryParam(currentValue, paramName, rawValue) : currentValue;
      });
    }
  }]);
}(_immutable.OrderedMap);
_defineProperty(Query, "defaults", Object.freeze({
  page: 1,
  departureCity: null,
  destCountry: [],
  destCity: [],
  destSight: [],
  dateFrom: (0, _moment["default"])().add(7, 'days').locale('ru').format('YYYY-MM-DD'),
  dateTo: (0, _moment["default"])().add(14, 'days').locale('ru').format('YYYY-MM-DD'),
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
  var query = Object.create(Query.prototype);
  query.size = orderedMap.size;
  query._map = orderedMap._map;
  query._list = orderedMap._list;
  return query;
}