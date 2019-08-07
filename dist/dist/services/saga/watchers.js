"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesWatchers = void 0;

var _effects = require("redux-saga/effects");

var _actions = require("../actions");

var _getServicesWorker = require("./workers/getServicesWorker"); // Core
// Instruments


var servicesWatchers = Object.freeze({
  getServicesWatcher:
  /*#__PURE__*/
  regeneratorRuntime.mark(function getServicesWatcher() {
    return regeneratorRuntime.wrap(function getServicesWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeLeading)(_actions.servicesActions.getServices, _getServicesWorker.getServicesWorker);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, getServicesWatcher);
  })
});
exports.servicesWatchers = servicesWatchers;