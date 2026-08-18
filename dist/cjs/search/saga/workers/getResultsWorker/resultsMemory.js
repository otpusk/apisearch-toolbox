"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoryInstances = exports.default = void 0;
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const createMemory = () => {
  const memory = {
    stableHotels: [],
    stablePrices: [],
    hotelsHub: {},
    offersHub: {},
    usedPrices: [],
    unusedPrices: [],
    total: 0
  };
  return {
    addStableHotels: next => {
      memory.stableHotels = R.concat(memory.stableHotels, next);
    },
    setStableHotels: next => {
      memory.stableHotels = next;
    },
    addHotels: next => {
      memory.hotelsHub = R.mergeAll([memory.hotelsHub, next]);
    },
    addOffers: next => {
      memory.offersHub = R.mergeAll([memory.offersHub, next]);
    },
    setUsedPrices: next => {
      memory.usedPrices = next;
    },
    addStablePrices: next => {
      memory.stablePrices = R.concat(memory.stablePrices, next);
    },
    setStablePrices: next => {
      memory.stablePrices = next;
    },
    clearUsedPrices: () => {
      memory.usedPrices = [];
    },
    setUnusedPrices: next => {
      memory.unusedPrices = next;
    },
    incTotal: nextTotal => {
      memory.total += nextTotal;
    },
    getValues: R.always(memory)
  };
};
var _default = exports.default = createMemory;
const memoryInstances = exports.memoryInstances = {};