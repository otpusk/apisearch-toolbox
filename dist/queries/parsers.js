"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rangeParser = exports.parseStringIntengerToBoolean = exports.numbersArrayParser = exports.geoParser = exports.datesParser = exports.createImmutableNumbersArrayParser = exports.createImmutableArrayParser = exports.binaryParser = exports.arrayParser = void 0;
var _immutable = require("immutable");
var _moment = _interopRequireDefault(require("moment"));
var _fn = require("./fn");
var _jsonApi = require("@otpusk/json-api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } // Core
// Instruments
/**
 * Parse binary string
 *
 * @param {string} value flags
 * @param {Object} options options
 * @returns {Map} flags list
 */
var binaryParser = exports.binaryParser = function binaryParser(value, _ref) {
  var _List;
  var prevValue = _ref.prevValue;
  var binaryValue = parseInt(value, 36).toString().split('').map(function (flag) {
    return Number(flag) === 1;
  });
  var newValues = (_List = (0, _immutable.List)(binaryValue)).unshift.apply(_List, _toConsumableArray(Array(prevValue.count() - binaryValue.length).fill(false)));
  return prevValue.mapEntries(function (_ref2, index) {
    var _ref3 = _slicedToArray(_ref2, 2),
      k = _ref3[0],
      v = _ref3[1];
    return [k, newValues.has(index) ? newValues.get(index) : v];
  });
};

/**
 * Parse range value
 *
 * @param {string} value range
 * @returns {Map} range
 */
var rangeParser = exports.rangeParser = function rangeParser(value) {
  var valuesArray = value.split(_fn.GLUE.range);
  var isEqualValues = valuesArray.length === 1;

  // methods
  var mapperValue = function mapperValue(v) {
    return !isNaN(parseInt(v, 10)) ? Number(v) : null;
  };
  if (isEqualValues) {
    var _valuesArray$map = valuesArray.map(mapperValue),
      _valuesArray$map2 = _slicedToArray(_valuesArray$map, 1),
      val = _valuesArray$map2[0];
    return (0, _immutable.Map)({
      'from': val,
      'to': val
    });
  }
  var _valuesArray$map3 = valuesArray.map(mapperValue),
    _valuesArray$map4 = _slicedToArray(_valuesArray$map3, 2),
    from = _valuesArray$map4[0],
    to = _valuesArray$map4[1];
  return (0, _immutable.Map)({
    from: from,
    to: to
  });
};

/**
 * Parse dates
 *
 * @param {string} value dates range
 * @returns {Map} dates
 */
var datesParser = exports.datesParser = function datesParser(value) {
  var _value$split$map$map = value.split(_fn.GLUE.range).map(function (str) {
      return (0, _moment["default"])(str, 'DD-MM-YYYY');
    }).map(function (date) {
      return date.isValid() ? date : null;
    }),
    _value$split$map$map2 = _slicedToArray(_value$split$map$map, 2),
    from = _value$split$map$map2[0],
    to = _value$split$map$map2[1];
  return (0, _immutable.Map)({
    from: from,
    to: to
  });
};

/**
 * Array parser
 *
 * @param {string} value string
 * @returns {Array} array
 */
var arrayParser = exports.arrayParser = function arrayParser(value) {
  return value ? value.split(_fn.GLUE.list) : [];
};

/**
 * Numbers array parser
 *
 * @param {string} value string
 * @returns{Array} array
 */
var numbersArrayParser = exports.numbersArrayParser = function numbersArrayParser(value) {
  return arrayParser(value).map(Number);
};

/**
 * Parse geo
 *
 * @param {Number} value geoId
 * @param {Object} token apitoken
 * @returns {Map} location
 */
var geoParser = exports.geoParser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(value, _ref4) {
    var token, location;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          token = _ref4.token;
          _context.n = 1;
          return (0, _jsonApi.getToursGeoById)(token, value);
        case 1:
          location = _context.v;
          return _context.a(2, location);
      }
    }, _callee);
  }));
  return function geoParser(_x, _x2) {
    return _ref5.apply(this, arguments);
  };
}();

/* parse boolean values that presented as a string */

var parseStringIntengerToBoolean = exports.parseStringIntengerToBoolean = function parseStringIntengerToBoolean(value) {
  return Boolean(Number(value));
};

/* immutable List, Set parser */

var createImmutableArrayParser = exports.createImmutableArrayParser = function createImmutableArrayParser(baseValueCreator) {
  return function (value) {
    return value ? baseValueCreator(value.split(_fn.GLUE.list)) : baseValueCreator();
  };
};
var createImmutableNumbersArrayParser = exports.createImmutableNumbersArrayParser = function createImmutableNumbersArrayParser(baseValueCreator) {
  return function (value) {
    return createImmutableArrayParser(baseValueCreator)(value).map(Number);
  };
};