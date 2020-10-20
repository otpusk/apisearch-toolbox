"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlightPortWorker = getFlightPortWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getFlightPortWorker);

function getFlightPortWorker(_ref) {
  var iata, _yield$select, token, lang, port;

  return regeneratorRuntime.wrap(function getFlightPortWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          iata = _ref.payload;
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
          lang = _yield$select.lang;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursFlightPort, token, iata, {
            lang: lang
          });

        case 9:
          port = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions.geoActions.getDepartureCitiesSuccess(iata, port));

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          _context.next = 18;
          return (0, _effects.put)(_actions.geoActions.getDepartureCitiesFail(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 14]]);
}