"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotelsMarkersWorker = getHotelsMarkersWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getHotelsMarkersWorker);

function getHotelsMarkersWorker(_ref) {
  var _ref$payload, countryId, cityId, center, radius, token, markers;

  return regeneratorRuntime.wrap(function getHotelsMarkersWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, countryId = _ref$payload.countryId, cityId = _ref$payload.cityId, center = _ref$payload.center, radius = _ref$payload.radius;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 4:
          token = _context.sent;
          _context.next = 7;
          return (0, _effects.call)(_jsonApi.getToursHotelsMarkers, token, countryId, cityId, {
            center: center,
            radius: radius
          });

        case 7:
          markers = _context.sent;
          _context.next = 10;
          return (0, _effects.put)(_actions.hotelsActions.getHotelsMarkersSuccess(markers));

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          _context.next = 16;
          return (0, _effects.put)(_actions.hotelsActions.getHotelsMarkersFail(_context.t0));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 12]]);
}