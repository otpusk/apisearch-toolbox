"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoryInstances = exports["default"] = void 0;
var R = _interopRequireWildcard(require("ramda"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var createMemory = function createMemory() {
  var memory = {
    stableHotels: [],
    stablePrices: [],
    hotelsHub: {},
    offersHub: {},
    usedPrices: [],
    unusedPrices: [],
    total: 0
  };
  return {
    addStableHotels: function addStableHotels(next) {
      memory.stableHotels = R.concat(memory.stableHotels, next);
    },
    setStableHotels: function setStableHotels(next) {
      memory.stableHotels = next;
    },
    addHotels: function addHotels(next) {
      memory.hotelsHub = R.mergeAll([memory.hotelsHub, next]);
    },
    addOffers: function addOffers(next) {
      memory.offersHub = R.mergeAll([memory.offersHub, next]);
    },
    setUsedPrices: function setUsedPrices(next) {
      memory.usedPrices = next;
    },
    addStablePrices: function addStablePrices(next) {
      memory.stablePrices = R.concat(memory.stablePrices, next);
    },
    setStablePrices: function setStablePrices(next) {
      memory.stablePrices = next;
    },
    clearUsedPrices: function clearUsedPrices() {
      memory.usedPrices = [];
    },
    setUnusedPrices: function setUnusedPrices(next) {
      memory.unusedPrices = next;
    },
    incTotal: function incTotal(nextTotal) {
      memory.total += nextTotal;
    },
    getValues: R.always(memory)
  };
};
var _default = exports["default"] = createMemory;
var memoryInstances = exports.memoryInstances = {};