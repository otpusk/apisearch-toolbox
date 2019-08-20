"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createImmutableNumbersArrayParser = exports.createImmutableArrayParser = exports.geoParser = exports.numbersArrayParser = exports.arrayParser = exports.datesParser = exports.rangeParser = exports.binaryParser = void 0;

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

var _fn = require("./fn");

var _jsonApi = require("@otpusk/json-api");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
/**
 * Parse binary string
 *
 * @param {string} value flags
 * @param {Object} options options
 * @returns {Map} flags list
 */


var binaryParser = function binaryParser(value, _ref) {
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


exports.binaryParser = binaryParser;

var rangeParser = function rangeParser(value) {
  var _value$split$map = value.split(_fn.GLUE.range).map(function (v) {
    return !isNaN(parseInt(v, 10)) ? Number(v) : null;
  }),
      _value$split$map2 = _slicedToArray(_value$split$map, 2),
      from = _value$split$map2[0],
      to = _value$split$map2[1];

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


exports.rangeParser = rangeParser;

var datesParser = function datesParser(value) {
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


exports.datesParser = datesParser;

var arrayParser = function arrayParser(value) {
  return value ? value.split(_fn.GLUE.list) : [];
};
/**
 * Numbers array parser
 *
 * @param {string} value string
 * @returns{Array} array
 */


exports.arrayParser = arrayParser;

var numbersArrayParser = function numbersArrayParser(value) {
  return arrayParser(value).map(Number);
};
/**
 * Parse geo
 *
 * @param {Number} value geoId
 * @param {Object} token apitoken
 * @returns {Map} location
 */


exports.numbersArrayParser = numbersArrayParser;

var geoParser =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(value, _ref4) {
    var token, location;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = _ref4.token;
            _context.next = 3;
            return (0, _jsonApi.getToursGeoById)(token, value);

          case 3:
            location = _context.sent;
            return _context.abrupt("return", location);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function geoParser(_x, _x2) {
    return _ref5.apply(this, arguments);
  };
}();
/* immutable List, Set parser */


exports.geoParser = geoParser;

var createImmutableArrayParser = function createImmutableArrayParser(baseValueCreator) {
  return function (value) {
    return value ? baseValueCreator(value.split(_fn.GLUE.list)) : baseValueCreator();
  };
};

exports.createImmutableArrayParser = createImmutableArrayParser;

var createImmutableNumbersArrayParser = function createImmutableNumbersArrayParser(baseValueCreator) {
  return function (value) {
    return createImmutableArrayParser(baseValueCreator)(value).map(Number);
  };
};

exports.createImmutableNumbersArrayParser = createImmutableNumbersArrayParser;