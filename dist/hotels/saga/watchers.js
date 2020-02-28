"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsWatchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _workers = require("./workers");

// Core
// Instruments
var hotelsWatchers = Object.freeze({
  getHotelWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getHotelWatcher() {
    return regeneratorRuntime.wrap(function getHotelWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.hotelsActions.getHotel, _workers.getHotelWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getHotelWatcher);
  }),
  getHotelsMarkersWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getHotelsMarkersWatcher() {
    return regeneratorRuntime.wrap(function getHotelsMarkersWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.hotelsActions.getHotelsMarkers, _workers.getHotelsMarkersWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, getHotelsMarkersWatcher);
  }),
  getSimilarHotelsWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getSimilarHotelsWatcher() {
    return regeneratorRuntime.wrap(function getSimilarHotelsWatcher$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.takeEvery)(_actions.hotelsActions.getSimilarHotels, _workers.getSimilarHotelsWorker);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, getSimilarHotelsWatcher);
  })
});
exports.hotelsWatchers = hotelsWatchers;