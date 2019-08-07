"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQueryStringWorker = parseQueryStringWorker;

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _actions = require("../../actions");

var _actions2 = require("../../../search/actions");

var _fn = require("../../fn");

var _parsers = require("../../parsers");

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

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(parseQueryParam),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(parseQueryStringWorker);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function parseQueryParam(paramName, rawValue, queryId) {
  var _paramsToParsers;

  var token, currentValue, paramsToParsers, parsedValue;
  return regeneratorRuntime.wrap(function parseQueryParam$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 2:
          token = _context.sent;
          _context.next = 5;
          return (0, _effects.select)(function (state) {
            return state.queries.get(queryId).get(paramName, null);
          });

        case 5:
          currentValue = _context.sent;
          paramsToParsers = (_paramsToParsers = {}, _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.AUTOSTART, Boolean), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.DEPARTURE, Number), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.CATEGORY, _parsers.binaryParser), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.TRANSPORT, _parsers.binaryParser), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.FOOD, _parsers.binaryParser), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.DATES, _parsers.datesParser), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.DURATION, _parsers.rangeParser), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.ADULTS, Number), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.CHILDREN, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.COUNTRY, String), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.CITIES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.HOTELS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.PRICE, _parsers.rangeParser), _defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)), _paramsToParsers);

          if (!(rawValue !== _fn.GLUE.empty)) {
            _context.next = 14;
            break;
          }

          _context.next = 10;
          return paramsToParsers[paramName](rawValue, {
            prevValue: currentValue,
            token: token
          });

        case 10:
          parsedValue = _context.sent;

          if (!parsedValue) {
            _context.next = 14;
            break;
          }

          _context.next = 14;
          return (0, _effects.put)(_actions.queriesActions.changeQueryParam(queryId, paramName, parsedValue));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function parseQueryStringWorker(_ref) {
  var _ref$payload, queryString, queryId, baseQuery, queryParams, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, resultQuery;

  return regeneratorRuntime.wrap(function parseQueryStringWorker$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _ref$payload = _ref.payload, queryString = _ref$payload.queryString, queryId = _ref$payload.queryId;
          _context3.next = 3;
          return (0, _effects.select)(function (state) {
            return state.queries.get(queryId);
          });

        case 3:
          baseQuery = _context3.sent;
          queryParams = queryString.replace('#/', '').split('/');
          _context3.prev = 5;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 9;
          _loop =
          /*#__PURE__*/
          regeneratorRuntime.mark(function _loop() {
            var _step$value, paramName, position, rawValue;

            return regeneratorRuntime.wrap(function _loop$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _step$value = _slicedToArray(_step.value, 1), paramName = _step$value[0];
                    position = baseQuery.keySeq().findIndex(function (f) {
                      return f === paramName;
                    });
                    rawValue = position in queryParams ? queryParams[position] : null;

                    if (!rawValue) {
                      _context2.next = 6;
                      break;
                    }

                    _context2.next = 6;
                    return parseQueryParam(paramName, rawValue, queryId);

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _loop);
          });
          _iterator = baseQuery[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 17;
            break;
          }

          return _context3.delegateYield(_loop(), "t0", 14);

        case 14:
          _iteratorNormalCompletion = true;
          _context3.next = 12;
          break;

        case 17:
          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t1 = _context3["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context3.t1;

        case 23:
          _context3.prev = 23;
          _context3.prev = 24;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 26:
          _context3.prev = 26;

          if (!_didIteratorError) {
            _context3.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context3.finish(26);

        case 30:
          return _context3.finish(23);

        case 31:
          _context3.next = 33;
          return (0, _effects.put)(_actions.queriesActions.parseQueryStringSuccess(queryId));

        case 33:
          _context3.next = 39;
          break;

        case 35:
          _context3.prev = 35;
          _context3.t2 = _context3["catch"](5);
          _context3.next = 39;
          return (0, _effects.put)(_actions.queriesActions.parseQueryStringFail(_context3.t2));

        case 39:
          _context3.next = 41;
          return (0, _effects.select)(function (state) {
            return state.queries.get(queryId);
          });

        case 41:
          resultQuery = _context3.sent;

          if (!(resultQuery.get(_fn.QUERY_PARAMS.AUTOSTART) === true)) {
            _context3.next = 45;
            break;
          }

          _context3.next = 45;
          return (0, _effects.put)(_actions2.searchActions.runSearch(queryId));

        case 45:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2, null, [[5, 35], [9, 19, 23, 31], [24,, 26, 30]]);
}