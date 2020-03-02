"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSimilarHotelsWorker = getSimilarHotelsWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getSimilarHotelsWorker);

function getSimilarHotelsWorker(_ref) {
  var hotelId, token, similar;
  return regeneratorRuntime.wrap(function getSimilarHotelsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hotelId = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 4:
          token = _context.sent;
          _context.next = 7;
          return (0, _effects.call)(_jsonApi.getToursSimilar, token, hotelId, 9);

        case 7:
          similar = _context.sent;
          _context.next = 10;
          return (0, _effects.put)(_actions.hotelsActions.getSimilarHotelsSuccess(hotelId, similar));

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          _context.next = 16;
          return (0, _effects.put)(_actions.hotelsActions.getSimilarHotelsFail(_context.t0));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 12]]);
}