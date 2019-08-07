"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersWatchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../../offers/actions");

var _workers = require("./workers"); // Core
// Instruments


var offersWatchers = Object.freeze({
  getOfferWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getOfferWatcher() {
    return regeneratorRuntime.wrap(function getOfferWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(_actions.offersActions.getOffer, _workers.getOfferWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getOfferWatcher);
  }),
  checkOfferStatusWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function checkOfferStatusWatcher() {
    return regeneratorRuntime.wrap(function checkOfferStatusWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.offersActions.checkOfferStatus, _workers.checkOfferStatusWorker);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, checkOfferStatusWatcher);
  })
});
exports.offersWatchers = offersWatchers;