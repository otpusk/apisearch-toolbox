"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDepartureCitiesWorker = getDepartureCitiesWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getDepartureCitiesWorker);

function getDepartureCitiesWorker(_ref) {
  var countryId, _ref2, token, lang, departures;

  return regeneratorRuntime.wrap(function getDepartureCitiesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          countryId = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (_ref3) {
            var auth = _ref3.auth;
            return {
              token: auth.getIn(['otpusk', 'token']),
              lang: auth.getIn(['otpusk', 'lang'], 'rus')
            };
          });

        case 4:
          _ref2 = _context.sent;
          token = _ref2.token;
          lang = _ref2.lang;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursDepartureCities, token, {
            geoId: countryId,
            lang: lang
          });

        case 9:
          departures = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions.geoActions.getDepartureCitiesSuccess(countryId, departures));

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