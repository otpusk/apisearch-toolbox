"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResultsWorker = getResultsWorker;

var _effects = require("redux-saga/effects");

var R = _interopRequireWildcard(require("ramda"));

var _jsonApi = require("@otpusk/json-api");

var _selectors = require("../../../../queries/selectors");

var _fn = require("../../../../queries/fn");

var _actions = require("../../../../search/actions");

var _actions2 = require("../../../../hotels/actions");

var _selectors2 = require("../../../../hotels/selectors");

var _actions3 = require("../../../../offers/actions");

var _resultsMemory = _interopRequireWildcard(require("./resultsMemory"));

var _helpers = require("./helpers");

var _constants = require("./constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getResultsWorker);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getResultsWorker(_ref) {
  var queryID, query, lang, token, otpsukQuery, activePage, memory, _yield$call, finished, hotels, offers, country, operators, _total, meta, prices, _memory$getValues2, usedPrices, totalValue, ignoreOperators, _memory$getValues3, total, _memory$getValues4, _usedPrices;

  return regeneratorRuntime.wrap(function getResultsWorker$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          queryID = _ref.payload;
          _context2.next = 3;
          return (0, _effects.select)(function (state) {
            return (0, _selectors.getQuery)(state, {
              queryID: queryID
            });
          });

        case 3:
          query = _context2.sent;
          _context2.next = 6;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'lang'], null);
          });

        case 6:
          lang = _context2.sent;
          _context2.next = 9;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 9:
          token = _context2.sent;
          otpsukQuery = (0, _fn.convertToOtpQuery)(query.set(_fn.QUERY_PARAMS.LANGUAGE, lang));
          _context2.next = 13;
          return (0, _effects.put)(_actions.searchActions.startSearch(queryID));

        case 13:
          otpsukQuery.number = 0;
          otpsukQuery.data = 'extlinks';
          activePage = query.get(_fn.QUERY_PARAMS.PAGE);
          activePage === 1 && delete _resultsMemory.memoryInstances[queryID];
          memory = _resultsMemory.memoryInstances[queryID] = _resultsMemory.memoryInstances[queryID] || (0, _resultsMemory["default"])();
          _context2.prev = 18;

        case 19:
          _context2.next = 21;
          return (0, _effects.call)(_jsonApi.getToursNextSearch, token, otpsukQuery);

        case 21:
          _yield$call = _context2.sent;
          finished = _yield$call.lastResult;
          hotels = _yield$call.hotels;
          offers = _yield$call.offers;
          country = _yield$call.country;
          operators = _yield$call.progress;
          _total = _yield$call.total;
          meta = _yield$call.meta;
          prices = _yield$call.prices;
          !R.isEmpty(hotels) && memory.addHotels(hotels);
          !R.isEmpty(offers) && memory.addOffers(offers);
          memory.incTotal(_total);
          return _context2.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _memory$getValues, hotelsHub, offersHub, usedPrices, unusedPrices, stableHotels, pricesWithoutStable, nextPrices, hotelsFromStore, hotelsToStore, offersToStore;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _memory$getValues = memory.getValues(), hotelsHub = _memory$getValues.hotelsHub, offersHub = _memory$getValues.offersHub, usedPrices = _memory$getValues.usedPrices, unusedPrices = _memory$getValues.unusedPrices, stableHotels = _memory$getValues.stableHotels;
                    pricesWithoutStable = R.filter(function (_ref2) {
                      var hotelID = _ref2.hotelID;
                      return !R.includes(hotelID, stableHotels);
                    }, prices);
                    nextPrices = (0, _helpers.generateNextPrices)([].concat(_toConsumableArray(pricesWithoutStable), _toConsumableArray(unusedPrices), _toConsumableArray(usedPrices)), offersHub);
                    _context.next = 5;
                    return (0, _effects.select)(_selectors2.hotelsHub);

                  case 5:
                    hotelsFromStore = _context.sent;
                    hotelsToStore = (0, _helpers.getHotelsEntitiesMap)(nextPrices, hotelsHub, hotelsFromStore);
                    offersToStore = (0, _helpers.getOffersEntitiesMap)(nextPrices, offersHub);
                    _context.t0 = !R.isEmpty(hotelsToStore);

                    if (!_context.t0) {
                      _context.next = 12;
                      break;
                    }

                    _context.next = 12;
                    return (0, _effects.put)(_actions2.hotelsActions.addHotels(hotelsToStore));

                  case 12:
                    _context.t1 = !R.isEmpty(offersToStore);

                    if (!_context.t1) {
                      _context.next = 16;
                      break;
                    }

                    _context.next = 16;
                    return (0, _effects.put)(_actions3.offersActions.addOffers(offersToStore));

                  case 16:
                    memory.setUsedPrices(nextPrices);
                    memory.setUnusedPrices((0, _helpers.getUnusedPrices)(nextPrices, [].concat(_toConsumableArray(pricesWithoutStable), _toConsumableArray(unusedPrices))));

                  case 18:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })(), "t0", 34);

        case 34:
          _memory$getValues2 = memory.getValues(), usedPrices = _memory$getValues2.usedPrices, totalValue = _memory$getValues2.total;
          _context2.next = 37;
          return (0, _effects.put)(_actions.searchActions.processSearch(queryID, {
            page: activePage,
            operators: operators,
            country: country,
            total: totalValue,
            meta: meta,
            prices: R.clone(usedPrices)
          }));

        case 37:
          if (!finished) {
            _context2.next = 39;
            break;
          }

          return _context2.abrupt("break", 45);

        case 39:
          _context2.next = 41;
          return (0, _effects.delay)(5000);

        case 41:
          ignoreOperators = (0, _helpers.getIgnoreOperators)(operators);
          !R.isEmpty(ignoreOperators) && (0, _helpers.addIgnoreOperators)(otpsukQuery, ignoreOperators);
          otpsukQuery.number += 1;

        case 44:
          if (otpsukQuery.number <= _constants.GUARANTEED_RESULT_STEP) {
            _context2.next = 19;
            break;
          }

        case 45:
          _memory$getValues3 = memory.getValues(), total = _memory$getValues3.total;
          _context2.next = 48;
          return (0, _effects.put)(_actions.searchActions.finishSearch(queryID, {
            total: total
          }));

        case 48:
          _context2.next = 55;
          break;

        case 50:
          _context2.prev = 50;
          _context2.t1 = _context2["catch"](18);
          _context2.next = 54;
          return (0, _effects.put)(_actions.searchActions.failSearch(queryID, _context2.t1, {
            message: _context2.t1.message,
            statusCode: parseInt(_context2.t1.message, 10)
          }));

        case 54:
          console.log(_context2.t1);

        case 55:
          _context2.prev = 55;
          _context2.next = 58;
          return (0, _effects.cancelled)();

        case 58:
          if (!_context2.sent) {
            _context2.next = 61;
            break;
          }

          _context2.next = 61;
          return (0, _effects.put)(_actions.searchActions.resetSearch(queryID));

        case 61:
          _memory$getValues4 = memory.getValues(), _usedPrices = _memory$getValues4.usedPrices;
          memory.addStableHotels((0, _helpers.getHotelsIDsFromPrices)(_usedPrices));
          memory.clearUsedPrices();
          return _context2.finish(55);

        case 65:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked, null, [[18, 50, 55, 65]]);
}