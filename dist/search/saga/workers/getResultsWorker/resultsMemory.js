"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoryInstances = exports["default"] = void 0;
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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