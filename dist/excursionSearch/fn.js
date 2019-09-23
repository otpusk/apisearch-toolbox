"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = void 0;

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

    return _possibleConstructorReturn(_this, makeQuery(_this = _possibleConstructorReturn(this, _getPrototypeOf(Query).call(this, Query.defaults))));
  }

  _createClass(Query, [{
    key: "set",
    value: function set(k, v) {
      return makeQuery(_get(_getPrototypeOf(Query.prototype), "set", this).call(this, k, v));
    }
  }, {
    key: "setDeparture",
    value: function setDeparture(value) {
      return this.set('departure', value);
    }
  }, {
    key: "getDeparture",
    value: function getDeparture() {
      return this.get('departure');
    }
  }, {
    key: "setLocations",
    value: function setLocations(value) {
      return this.set('locations', value);
    }
  }, {
    key: "getLocations",
    value: function getLocations() {
      return this.get('locations');
    }
  }, {
    key: "setDates",
    value: function setDates(value) {
      return this.set('dates', value);
    }
  }, {
    key: "getDates",
    value: function getDates() {
      return this.get('dates');
    }
  }, {
    key: "setDuration",
    value: function setDuration(value) {
      return this.set('duration', value);
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get('duration');
    }
  }]);

  return Query;
}(_immutable.OrderedMap);

exports.Query = Query;

_defineProperty(Query, "defaults", Object.freeze({
  departure: null,
  locations: [],
  dates: {
    from: (0, _moment["default"])().add(7, 'days').locale('ru'),
    to: (0, _moment["default"])().add(14, 'days').locale('ru')
  },
  duration: {
    from: 4,
    to: 8
  }
}));

function makeQuery(orderedMap) {
  var query = Object.create(Query.prototype);
  query.size = orderedMap.size;
  query._map = orderedMap._map;
  query._list = orderedMap._list;
  return query;
}