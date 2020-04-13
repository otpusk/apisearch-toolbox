"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailableDatesWorker = getAvailableDatesWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _immutable = require("immutable");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getAvailableDatesWorker);

function getAvailableDatesWorker(_ref) {
  var options, _yield$select, token, dates;

  return regeneratorRuntime.wrap(function getAvailableDatesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _ref.payload.options;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (_ref2) {
            var auth = _ref2.auth;
            return {
              token: auth.getIn(['otpusk', 'token']),
              lang: auth.getIn(['otpusk', 'lang'], 'rus')
            };
          });

        case 4:
          _yield$select = _context.sent;
          token = _yield$select.token;
          _context.next = 8;
          return (0, _effects.call)(_jsonApi.getToursDates, token, options);

        case 8:
          dates = _context.sent;
          _context.next = 11;
          return (0, _effects.put)(_actions.searchActions.getAvailableDatesSuccess((0, _immutable.List)(dates)));

        case 11:
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          _context.next = 17;
          return (0, _effects.put)(_actions.searchActions.getAvailableDatesFail(_context.t0));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 13]]);
}