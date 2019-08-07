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
  var queryId, _ref2, query, token, killer, _loop, _ret;

  return regeneratorRuntime.wrap(function runSearchWorker$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          queryId = _ref.payload;
          _context3.prev = 1;
          _context3.next = 4;
          return (0, _effects.select)(function (state) {
            return {
              query: (0, _fn.convertToOtpQuery)(state.queries.get(queryId))
            };
          });

        case 4:
          _ref2 = _context3.sent;
          query = _ref2.query;
          _context3.next = 8;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 8:
          token = _context3.sent;
          _context3.next = 11;
          return (0, _effects.fork)(runSearchKiller);

        case 11:
          killer = _context3.sent;
          _context3.next = 14;
          return (0, _effects.put)(_actions.searchActions.startSearch(queryId));

        case 14:
          query.number = 0;
          _loop =
          /*#__PURE__*/
          regeneratorRuntime.mark(function _loop() {
            var _ref3, finished, result, country, operators, total, meta, hotels, offers;

            return regeneratorRuntime.wrap(function _loop$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _effects.call)(_jsonApi.getToursSearch, token, query);

                  case 2:
                    _ref3 = _context2.sent;
                    finished = _ref3.lastResult;
                    result = _ref3.result;
                    country = _ref3.country;
                    operators = _ref3.progress;
                    total = _ref3.total;
                    meta = _ref3.meta;
                    hotels = (0, _immutable.Map)(result.hotels).filter(function (_ref4) {
                      var name = _ref4.name;
                      return Boolean(name);
                    }).map(function (hotel) {
                      return (0, _immutable.fromJS)(hotel).updateIn(['offers'], function (offers) {
                        return offers.map(function (offerId) {
                          return result.offers[offerId];
                        }).sortBy(function (_ref5) {
                          var uah = _ref5.price;
                          return uah;
                        });
                      });
                    }).sortBy(function (hotel) {
                      return hotel.get('offers').first().price.uah;
                    }).map(function (hotel) {
                      return hotel.updateIn(['offers'], function (offers) {
                        return offers.map(function (_ref6) {
                          var id = _ref6.id;
                          return id;
                        });
                      }).toJS();
                    });
                    offers = (0, _immutable.Map)(result.offers).filter(function (_ref7) {
                      var id = _ref7.id;
                      return hotels.some(function (_ref8) {
                        var hotelOffers = _ref8.offers;
                        return hotelOffers.includes(id);
                      });
                    });

                    if (!(hotels && offers)) {
                      _context2.next = 16;
                      break;
                    }

                    _context2.next = 14;
                    return (0, _effects.put)(_actions2.hotelsActions.addHotels(hotels));

                  case 14:
                    _context2.next = 16;
                    return (0, _effects.put)(_actions3.offersActions.addOffers(offers));

                  case 16:
                    _context2.next = 18;
                    return (0, _effects.put)(_actions.searchActions.processSearch(queryId, {
                      operators: operators,
                      hotels: hotels.map(function (_ref9) {
                        var hotelOffers = _ref9.offers;
                        return hotelOffers;
                      }),
                      country: country,
                      total: total,
                      meta: meta,
                      page: query.page
                    }));

                  case 18:
                    if (!finished) {
                      _context2.next = 20;
                      break;
                    }

                    return _context2.abrupt("return", "break");

                  case 20:
                    _context2.next = 22;
                    return (0, _effects.delay)(5000);

                  case 22:
                    query.number += 1;

                  case 23:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _loop);
          });

        case 16:
          return _context3.delegateYield(_loop(), "t0", 17);

        case 17:
          _ret = _context3.t0;

          if (!(_ret === "break")) {
            _context3.next = 20;
            break;
          }

          return _context3.abrupt("break", 21);

        case 20:
          if (killer.isRunning()) {
            _context3.next = 16;
            break;
          }

        case 21:
          _context3.next = 23;
          return (0, _effects.delay)(200);

        case 23:
          _context3.next = 25;
          return (0, _effects.put)(_actions.searchActions.finishSearch(queryId));

        case 25:
          _context3.next = 31;
          break;

        case 27:
          _context3.prev = 27;
          _context3.t1 = _context3["catch"](1);
          _context3.next = 31;
          return (0, _effects.put)(_actions.searchActions.failSearch(queryId));

        case 31:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2, null, [[1, 27]]);
}