"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeoTreeWorker = getGeoTreeWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getGeoTreeWorker);

function getGeoTreeWorker() {
  var token, lang, geoTree;
  return regeneratorRuntime.wrap(function getGeoTreeWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 3:
          token = _context.sent;
          _context.next = 6;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'lang'], 'rus');
          });

        case 6:
          lang = _context.sent;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursSuggests, token, null, {
            lang: lang,
            'with': 'price&city',
            nsv: 1
          });

        case 9:
          geoTree = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions.geoActions.getGeoTreeSuccess(geoTree));

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          _context.next = 18;
          return (0, _effects.put)(_actions.geoActions.getGeoTreeFail(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 14]]);
}