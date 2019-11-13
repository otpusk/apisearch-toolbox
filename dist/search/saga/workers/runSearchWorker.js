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

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(runSearchKiller),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(runSearchWorker);

function runSearchKiller() {
  return regeneratorRuntime.wrap(function runSearchKiller$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.delay)(35000);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function runSearchWorker(_ref) {
  var queryId;
  return regeneratorRuntime.wrap(function runSearchWorker$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          queryId = _ref.payload;
          _context4.prev = 1;
          return _context4.delegateYield(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _ref2, otpsukQuery, query, token, killer, _loop, _ret;

            return regeneratorRuntime.wrap(function _callee$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return (0, _effects.select)(function (state) {
                      return {
                        query: state.queries.get(queryId),
                        otpsukQuery: (0, _fn.convertToOtpQuery)(state.queries.get(queryId))
                      };
                    });

                  case 2:
                    _ref2 = _context3.sent;
                    otpsukQuery = _ref2.otpsukQuery;
                    query = _ref2.query;
                    _context3.next = 7;
                    return (0, _effects.select)(function (state) {
                      return state.auth.getIn(['otpusk', 'token']);
                    });

                  case 7:
                    token = _context3.sent;
                    _context3.next = 10;
                    return (0, _effects.fork)(runSearchKiller);

                  case 10:
                    killer = _context3.sent;
                    _context3.next = 13;
                    return (0, _effects.put)(_actions.searchActions.startSearch(queryId));

                  case 13:
                    otpsukQuery.number = 0;
                    _loop =
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _loop() {
                      var _ref3, finished, result, country, operators, total, meta, getPriceValueByOfferId, hotels, offers;

                      return regeneratorRuntime.wrap(function _loop$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return (0, _effects.call)(_jsonApi.getToursSearch, token, otpsukQuery);

                            case 2:
                              _ref3 = _context2.sent;
                              finished = _ref3.lastResult;
                              result = _ref3.result;
                              country = _ref3.country;
                              operators = _ref3.progress;
                              total = _ref3.total;
                              meta = _ref3.meta;

                              getPriceValueByOfferId = function getPriceValueByOfferId(id) {
                                var _result$offers$id = result.offers[id],
                                    currency = _result$offers$id.currency,
                                    price = _result$offers$id.price;
                                return currency in price ? price[currency] : price.uah;
                              };

                              hotels = (0, _immutable.Map)(result.hotels).filter(function (_ref4) {
                                var name = _ref4.name;
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
                              offers = (0, _immutable.Map)(result.offers).filter(function (_ref5) {
                                var id = _ref5.id;
                                return hotels.some(function (_ref6) {
                                  var hotelOffers = _ref6.offers;
                                  return hotelOffers.includes(id);
                                });
                              });

                              if (!(hotels && offers)) {
                                _context2.next = 17;
                                break;
                              }

                              _context2.next = 15;
                              return (0, _effects.put)(_actions2.hotelsActions.addHotels(hotels));

                            case 15:
                              _context2.next = 17;
                              return (0, _effects.put)(_actions3.offersActions.addOffers(offers));

                            case 17:
                              _context2.next = 19;
                              return (0, _effects.put)(_actions.searchActions.processSearch(queryId, {
                                operators: operators,
                                hotels: hotels.map(function (_ref7) {
                                  var hotelOffers = _ref7.offers;
                                  return hotelOffers;
                                }),
                                country: country,
                                total: total,
                                meta: meta,
                                page: otpsukQuery.page
                              }));

                            case 19:
                              if (!finished) {
                                _context2.next = 21;
                                break;
                              }

                              return _context2.abrupt("return", "break");

                            case 21:
                              _context2.next = 23;
                              return (0, _effects.delay)(5000);

                            case 23:
                              otpsukQuery.number += 1;

                            case 24:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _loop);
                    });

                  case 15:
                    return _context3.delegateYield(_loop(), "t0", 16);

                  case 16:
                    _ret = _context3.t0;

                    if (!(_ret === "break")) {
                      _context3.next = 19;
                      break;
                    }

                    return _context3.abrupt("break", 20);

                  case 19:
                    if (killer.isRunning()) {
                      _context3.next = 15;
                      break;
                    }

                  case 20:
                    _context3.next = 22;
                    return (0, _effects.delay)(200);

                  case 22:
                    _context3.next = 24;
                    return (0, _effects.put)(_actions.searchActions.finishSearch(queryId));

                  case 24:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee);
          })(), "t0", 3);

        case 3:
          _context4.next = 9;
          break;

        case 5:
          _context4.prev = 5;
          _context4.t1 = _context4["catch"](1);
          _context4.next = 9;
          return (0, _effects.put)(_actions.searchActions.failSearch(queryId));

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked2, null, [[1, 5]]);
}