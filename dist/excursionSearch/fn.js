"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = void 0;

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

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
      return this.set('operators', operators);
    }
  }, {
    key: "getOperators",
    value: function getOperators() {
      return this.get('operators');
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
      return this.set('withoutNightTransfer', flag);
    }
  }, {
    key: "isWithoutNightTransfer",
    value: function isWithoutNightTransfer() {
      return this.get('withoutNightTransfer');
    }
  }]);

  return Query;
}(_immutable.OrderedMap);

exports.Query = Query;

_defineProperty(Query, "defaults", Object.freeze({
  page: 1,
  departureCity: null,
  destCountry: [],
  destCity: [],
  destSight: [],
  dateFrom: (0, _moment["default"])().add(7, 'days').locale('ru'),
  dateTo: (0, _moment["default"])().add(14, 'days').locale('ru'),
  lengthFrom: 4,
  lengthTo: 8,
  operators: [],
  categories: [],
  transport: [],
  priceFrom: null,
  priceTo: null,
  withoutNightTransfer: false
}));

function makeQuery(orderedMap) {
  var query = Object.create(Query.prototype);
  query.size = orderedMap.size;
  query._map = orderedMap._map;
  query._list = orderedMap._list;
  return query;
}