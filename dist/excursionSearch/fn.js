"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileQuery = compileQuery;
exports.parseQueryParam = parseQueryParam;
exports.parseQueryString = parseQueryString;
exports.GLUE = exports.Query = void 0;

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

var _compilers = require("./compilers");

var _parsers = require("./parsers");

var _Object$freeze;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var QUERY_PARAMS = {
  PAGE: 'page',
  DEPARTURE_CITY: 'departureCity',
  DEST_COUNTRY: 'destCountry',
  DEST_CITY: 'destCity',
  DEST_SIGHT: 'destSight',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  LENGTH_FROM: 'lengthFrom',
  LENGTH_TO: 'lengthTo',
  OP_ID: 'opId',
  CATEGORIES: 'categories',
  TRANSPORT: 'transport',
  PRICE_FROM: 'priceFrom',
  PRICE_TO: 'priceTo',
  NO_NIGHT_MOVES: 'noNightMoves',
  SORT_PRICE: 'sortPrice',
  SORT_LENGTH: 'sortLength',
  SORT_CITIES_CNT: 'sortCitiesCnt',
  SORT_COUNTRIES_CNT: 'sortCountriesCnt'
};

var Query =
/*#__PURE__*/
function (_OrderedMap) {
  _inherits(Query, _OrderedMap);

  function Query() {
    var _this;

    _classCallCheck(this, Query);

    return _possibleConstructorReturn(_this, makeQuery((0, _immutable.OrderedMap)(Query.defaults)));
  }

  _createClass(Query, [{
    key: "set",
    value: function set(k, v) {
      return makeQuery(_get(_getPrototypeOf(Query.prototype), "set", this).call(this, k, v));
    }
  }, {
    key: "setPage",
    value: function setPage(page) {
      return this.set(QUERY_PARAMS.PAGE, page);
    }
  }, {
    key: "getPage",
    value: function getPage(page) {
      return this.get(QUERY_PARAMS.PAGE, page);
    }
  }, {
    key: "setDeparture",
    value: function setDeparture(value) {
      return this.set(QUERY_PARAMS.DEPARTURE_CITY, value);
    }
  }, {
    key: "getDeparture",
    value: function getDeparture() {
      return this.get(QUERY_PARAMS.DEPARTURE_CITY);
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

      return this.set(QUERY_PARAMS.DEST_COUNTRY, countries).set(QUERY_PARAMS.DEST_CITY, cities).set(QUERY_PARAMS.DEST_SIGHT, sights);
    }
  }, {
    key: "getLocations",
    value: function getLocations() {
      return [].concat(_toConsumableArray(this.get(QUERY_PARAMS.DEST_COUNTRY, []).map(function (id) {
        return {
          id: id,
          type: 'countries'
        };
      })), _toConsumableArray(this.get(QUERY_PARAMS.DEST_CITY, []).map(function (id) {
        return {
          id: id,
          type: 'cities'
        };
      })), _toConsumableArray(this.get(QUERY_PARAMS.DEST_SIGHT, []).map(function (id) {
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
      return this.set(QUERQUERY_PARAMS.DATE_FROM, from).set(QUERY_PARAMS.DATE_TO, to);
    }
  }, {
    key: "getDates",
    value: function getDates() {
      return {
        from: this.get(QUERY_PARAMS.DATE_FROM),
        to: this.get(QUERY_PARAMS.DATE_TO)
      };
    }
  }, {
    key: "setDuration",
    value: function setDuration(_ref3) {
      var from = _ref3.from,
          to = _ref3.to;
      return this.set(QUERY_PARAMS.LENGTH_FROM, from).set(QUERY_PARAMS.LENGTH_TO, to);
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return {
        from: this.get(QUERY_PARAMS.LENGTH_FROM),
        to: this.get(QUERY_PARAMS.LENGTH_TO)
      };
    }
  }, {
    key: "setOperators",
    value: function setOperators(operators) {
      return this.set(QUERY_PARAMS.OP_ID, operators);
    }
  }, {
    key: "getOperators",
    value: function getOperators() {
      return this.get(QUERY_PARAMS.OP_ID);
    }
  }, {
    key: "setCategories",
    value: function setCategories(categories) {
      return this.set(QUERY_PARAMS.CATEGORIES, categories);
    }
  }, {
    key: "getCategories",
    value: function getCategories() {
      return this.get(QUERY_PARAMS.CATEGORIES);
    }
  }, {
    key: "setTransport",
    value: function setTransport(transport) {
      return this.set(QUERY_PARAMS.TRANSPORT, transport);
    }
  }, {
    key: "getTransport",
    value: function getTransport() {
      return this.get(QUERY_PARAMS.TRANSPORT);
    }
  }, {
    key: "setPrice",
    value: function setPrice(_ref4) {
      var from = _ref4.from,
          to = _ref4.to;
      return this.set(QUERY_PARAMS.PRICE_FROM, from).set(QUERY_PARAMS.PRICE_TO, to);
    }
  }, {
    key: "getPrice",
    value: function getPrice() {
      return {
        from: this.get(QUERY_PARAMS.PRICE_FROM),
        to: this.get(QUERY_PARAMS.PRICE_TO)
      };
    }
  }, {
    key: "setWithoutNightTransfer",
    value: function setWithoutNightTransfer(flag) {
      return this.set(QUERY_PARAMS.NO_NIGHT_MOVES, flag);
    }
  }, {
    key: "isWithoutNightTransfer",
    value: function isWithoutNightTransfer() {
      return this.get(QUERY_PARAMS.NO_NIGHT_MOVES);
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
      return this.set(QUERY_PARAMS.SORT_PRICE, price).set(QUERY_PARAMS.SORT_LENGTH, length).set(QUERY_PARAMS.SORT_CITIES_CNT, citiesCount).set(QUERY_PARAMS.SORT_COUNTRIES_CNT, countriesCount);
    }
  }, {
    key: "getSortsOrder",
    value: function getSortsOrder() {
      return {
        price: this.get(QUERY_PARAMS.SORT_PRICE),
        length: this.get(QUERY_PARAMS.SORT_LENGTH),
        citiesCount: this.get(QUERY_PARAMS.SORT_CITIES_CNT),
        countriesCount: this.get(QUERY_PARAMS.SORT_COUNTRIES_CNT)
      };
    }
  }]);

  return Query;
}(_immutable.OrderedMap);
/**
 * Query string flue
 */


exports.Query = Query;

_defineProperty(Query, "defaults", Object.freeze((_Object$freeze = {}, _defineProperty(_Object$freeze, QUERY_PARAMS.PAGE, 1), _defineProperty(_Object$freeze, QUERY_PARAMS.DEPARTURE_CITY, null), _defineProperty(_Object$freeze, QUERY_PARAMS.DEST_COUNTRY, []), _defineProperty(_Object$freeze, QUERY_PARAMS.DEST_CITY, []), _defineProperty(_Object$freeze, QUERY_PARAMS.DEST_SIGHT, []), _defineProperty(_Object$freeze, QUERY_PARAMS.DATE_FROM, (0, _moment["default"])().add(7, 'days').locale('ru')), _defineProperty(_Object$freeze, QUERY_PARAMS.DATE_TO, (0, _moment["default"])().add(14, 'days').locale('ru')), _defineProperty(_Object$freeze, QUERY_PARAMS.LENGTH_FROM, 4), _defineProperty(_Object$freeze, QUERY_PARAMS.LENGTH_TO, 8), _defineProperty(_Object$freeze, QUERY_PARAMS.OP_ID, []), _defineProperty(_Object$freeze, QUERY_PARAMS.CATEGORIES, []), _defineProperty(_Object$freeze, QUERY_PARAMS.TRANSPORT, []), _defineProperty(_Object$freeze, QUERY_PARAMS.PRICE_FROM, null), _defineProperty(_Object$freeze, QUERY_PARAMS.PRICE_TO, null), _defineProperty(_Object$freeze, QUERY_PARAMS.NO_NIGHT_MOVES, false), _defineProperty(_Object$freeze, QUERY_PARAMS.SORT_PRICE, null), _defineProperty(_Object$freeze, QUERY_PARAMS.SORT_LENGTH, null), _defineProperty(_Object$freeze, QUERY_PARAMS.SORT_CITIES_CNT, null), _defineProperty(_Object$freeze, QUERY_PARAMS.SORT_COUNTRIES_CNT, null), _Object$freeze)));

var GLUE = {
  field: '/',
  range: '-',
  list: ',',
  binary: '',
  empty: '!'
};
exports.GLUE = GLUE;

function makeQuery(orderedMap) {
  var query = Object.create(Query.prototype);
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


function compileQuery(query) {
  var _fieldsToCompilers;

  var fieldsToCompilers = (_fieldsToCompilers = {}, _defineProperty(_fieldsToCompilers, QUERY_PARAMS.PAGE, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DEPARTURE_CITY, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DEST_COUNTRY, _compilers.arrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DEST_CITY, _compilers.arrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DEST_SIGHT, _compilers.arrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DATE_FROM, _compilers.dateCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.DATE_TO, _compilers.dateCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.LENGTH_FROM, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.LENGTH_TO, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.OP_ID, _compilers.arrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.CATEGORIES, _compilers.arrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.TRANSPORT, _compilers.arrayCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.PRICE_FROM, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.PRICE_TO, _compilers.numberCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.NO_NIGHT_MOVES, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.SORT_PRICE, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.SORT_LENGTH, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.SORT_CITIES_CNT, _compilers.toStringCompiler), _defineProperty(_fieldsToCompilers, QUERY_PARAMS.SORT_COUNTRIES_CNT, _compilers.toStringCompiler), _fieldsToCompilers);
  return GLUE.field + query.map(function (value, field) {
    return value && field in fieldsToCompilers ? fieldsToCompilers[field](value) : GLUE.empty;
  }).toList().join(GLUE.field).replace(new RegExp("[".concat(GLUE.field).concat(GLUE.empty, "]+$")), '');
}

function parseQueryParam(currentValue, paramName, rawValue) {
  var _paramsToParsers;

  var paramsToParsers = (_paramsToParsers = {}, _defineProperty(_paramsToParsers, QUERY_PARAMS.PAGE, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.DEPARTURE_CITY, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.DEST_COUNTRY, _parsers.numbersArrayParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.DEST_CITY, _parsers.numbersArrayParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.DEST_SIGHT, _parsers.numbersArrayParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.DATE_FROM, _parsers.dateParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.DATE_TO, _parsers.dateParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.LENGTH_FROM, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.LENGTH_TO, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.OP_ID, _parsers.numbersArrayParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.CATEGORIES, _parsers.numbersArrayParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.TRANSPORT, _parsers.numbersArrayParser), _defineProperty(_paramsToParsers, QUERY_PARAMS.PRICE_FROM, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.PRICE_TO, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.NO_NIGHT_MOVES, Number), _defineProperty(_paramsToParsers, QUERY_PARAMS.SORT_PRICE, String), _defineProperty(_paramsToParsers, QUERY_PARAMS.SORT_LENGTH, String), _defineProperty(_paramsToParsers, QUERY_PARAMS.SORT_CITIES_CNT, String), _defineProperty(_paramsToParsers, QUERY_PARAMS.SORT_COUNTRIES_CNT, String), _paramsToParsers);

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

function parseQueryString(queryString) {
  var query = makeQuery((0, _immutable.OrderedMap)(Query.defaults));
  var params = queryString.replace('#/', '').split('/');
  return query.map(function (currentValue, paramName) {
    var position = query.keySeq().findIndex(function (f) {
      return f === paramName;
    });
    var rawValue = position in params ? params[position] : null;
    return rawValue ? parseQueryParam(currentValue, paramName, rawValue) : currentValue;
  });
}