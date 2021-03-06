"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runSearchWorker = runSearchWorker;

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _jsonApi = require("@otpusk/json-api");

var _fn = require("../../../queries/fn");

var _actions = require("../../../search/actions");

var _actions2 = require("../../../hotels/actions");

var _actions3 = require("../../../offers/actions");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(runSearchWorker);

// current result gets filled despite any operators progress status on step 7
var GUARANTEED_RESULT_STEP = 7;
var DEFAULT_ERROR_STATUS_CODE = 500;

function runSearchWorker(_ref) {
  var queryId;
  return regeneratorRuntime.wrap(function runSearchWorker$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          queryId = _ref.payload;
          _context3.prev = 1;
          return _context3.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var query, lang, token, otpsukQuery, totalResults, _loop, _ret;

            return regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _effects.select)(function (state) {
                      return state.queries.get(queryId);
                    });

                  case 2:
                    query = _context2.sent;
                    _context2.next = 5;
                    return (0, _effects.select)(function (state) {
                      return state.auth.getIn(['otpusk', 'lang'], null);
                    });

                  case 5:
                    lang = _context2.sent;
                    _context2.next = 8;
                    return (0, _effects.select)(function (state) {
                      return state.auth.getIn(['otpusk', 'token']);
                    });

                  case 8:
                    token = _context2.sent;
                    otpsukQuery = (0, _fn.convertToOtpQuery)(query.set(_fn.QUERY_PARAMS.LANGUAGE, lang));
                    _context2.next = 12;
                    return (0, _effects.put)(_actions.searchActions.startSearch(queryId));

                  case 12:
                    otpsukQuery.number = 0;
                    totalResults = 0;
                    _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                      var _yield$call, finished, result, country, operators, total, meta, getPriceValueByOfferId, hotels, offers;

                      return regeneratorRuntime.wrap(function _loop$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return (0, _effects.call)(_jsonApi.getToursSearch, token, otpsukQuery);

                            case 2:
                              _yield$call = _context.sent;
                              finished = _yield$call.lastResult;
                              result = _yield$call.result;
                              country = _yield$call.country;
                              operators = _yield$call.progress;
                              total = _yield$call.total;
                              meta = _yield$call.meta;

                              getPriceValueByOfferId = function getPriceValueByOfferId(id) {
                                var _result$offers$id = result.offers[id],
                                    currency = _result$offers$id.currency,
                                    price = _result$offers$id.price;
                                return currency in price ? price[currency] : price.uah;
                              };

                              hotels = (0, _immutable.Map)(result.hotels).filter(function (_ref2) {
                                var name = _ref2.name;
                                return Boolean(name) || query.get(_fn.QUERY_PARAMS.SHORT);
                              }).map(function (hotel) {
                                return (0, _immutable.fromJS)(hotel).updateIn(['offers'], function (offers) {
                                  return offers.sortBy(getPriceValueByOfferId);
                                });
                              }).sortBy(function (hotel) {
                                return getPriceValueByOfferId(hotel.get('offers').first());
                              }).map(function (hotel) {
                                return hotel.toJS();
                              });
                              offers = (0, _immutable.Map)(result.offers).filter(function (_ref3) {
                                var id = _ref3.id;
                                return hotels.some(function (_ref4) {
                                  var hotelOffers = _ref4.offers;
                                  return hotelOffers.includes(id);
                                });
                              });

                              if (!(hotels && offers)) {
                                _context.next = 17;
                                break;
                              }

                              _context.next = 15;
                              return (0, _effects.put)(_actions2.hotelsActions.addHotels(hotels));

                            case 15:
                              _context.next = 17;
                              return (0, _effects.put)(_actions3.offersActions.addOffers(offers));

                            case 17:
                              totalResults = total;
                              _context.next = 20;
                              return (0, _effects.put)(_actions.searchActions.processSearch(queryId, {
                                operators: operators,
                                hotels: hotels.map(function (_ref5) {
                                  var hotelOffers = _ref5.offers;
                                  return hotelOffers;
                                }),
                                country: country,
                                total: total,
                                meta: meta,
                                page: otpsukQuery.page
                              }));

                            case 20:
                              if (!finished) {
                                _context.next = 22;
                                break;
                              }

                              return _context.abrupt("return", "break");

                            case 22:
                              _context.next = 24;
                              return (0, _effects.delay)(5000);

                            case 24:
                              otpsukQuery.number += 1;

                            case 25:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _loop);
                    });

                  case 15:
                    return _context2.delegateYield(_loop(), "t0", 16);

                  case 16:
                    _ret = _context2.t0;

                    if (!(_ret === "break")) {
                      _context2.next = 19;
                      break;
                    }

                    return _context2.abrupt("break", 20);

                  case 19:
                    if (otpsukQuery.number <= GUARANTEED_RESULT_STEP) {
                      _context2.next = 15;
                      break;
                    }

                  case 20:
                    _context2.next = 22;
                    return (0, _effects.delay)(200);

                  case 22:
                    _context2.next = 24;
                    return (0, _effects.put)(_actions.searchActions.finishSearch(queryId, {
                      total: totalResults
                    }));

                  case 24:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee);
          })(), "t0", 3);

        case 3:
          _context3.next = 11;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t1 = _context3["catch"](1);
          _context3.next = 9;
          return (0, _effects.put)(_actions.searchActions.failSearch(queryId));

        case 9:
          _context3.next = 11;
          return (0, _effects.put)(_actions.searchActions.setFailSearchError(queryId, {
            message: _context3.t1.message,
            statusCode: parseInt(_context3.t1.message, 10) || DEFAULT_ERROR_STATUS_CODE
          }));

        case 11:
          _context3.prev = 11;
          _context3.next = 14;
          return (0, _effects.cancelled)();

        case 14:
          if (!_context3.sent) {
            _context3.next = 17;
            break;
          }

          _context3.next = 17;
          return (0, _effects.put)(_actions.searchActions.resetSearch(queryId));

        case 17:
          return _context3.finish(11);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked, null, [[1, 5, 11, 18]]);
}