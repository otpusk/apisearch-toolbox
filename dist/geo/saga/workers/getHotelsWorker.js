"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotelsWorker = getHotelsWorker;

var _effects = require("redux-saga/effects");

var _jsonApi = require("@otpusk/json-api");

var _actions = require("../../actions");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getHotelsWorker);

function getHotelsWorker(_ref) {
  var payload, countryId, withPrice, services, rating, methodVersion, token, lang, hotels;
  return regeneratorRuntime.wrap(function getHotelsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          countryId = payload.countryId, withPrice = payload.withPrice, services = payload.services, rating = payload.rating, methodVersion = payload.methodVersion;
          _context.prev = 2;
          _context.next = 5;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 5:
          token = _context.sent;
          _context.next = 8;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'lang'], 'rus');
          });

        case 8:
          lang = _context.sent;
          _context.next = 11;
          return (0, _effects.call)(_jsonApi.getToursHotels, token, countryId, {
            lang: lang,
            withPrice: withPrice,
            services: services,
            rating: rating
          }, methodVersion);

        case 11:
          hotels = _context.sent;
          _context.next = 14;
          return (0, _effects.put)(_actions.geoActions.getHotelsSuccess(countryId, hotels));

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          _context.next = 20;
          return (0, _effects.put)(_actions.geoActions.getHotelsFail(_context.t0));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[2, 16]]);
}