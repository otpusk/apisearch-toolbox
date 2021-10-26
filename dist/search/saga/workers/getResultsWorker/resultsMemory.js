"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoryInstances = exports["default"] = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var createMemory = function createMemory() {
  var memory = {
    stableHotels: [],
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
    addHotels: function addHotels(next) {
      memory.hotelsHub = R.mergeAll([memory.hotelsHub, next]);
    },
    addOffers: function addOffers(next) {
      memory.offersHub = R.mergeAll([memory.offersHub, next]);
    },
    setUsedPrices: function setUsedPrices(next) {
      memory.usedPrices = next;
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

var _default = createMemory;
exports["default"] = _default;
var memoryInstances = {};
exports.memoryInstances = memoryInstances;