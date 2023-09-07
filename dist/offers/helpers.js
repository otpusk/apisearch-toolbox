"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presetEmpyShapeForActualizedOffer = exports.isOfferKey = exports.generateOfferKey = exports.extractDataFromOfferKey = void 0;

var _ramda = require("ramda");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var generateOfferKey = function generateOfferKey(id) {
  var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return "".concat(id, "-").concat(JSON.stringify(meta));
};

exports.generateOfferKey = generateOfferKey;

var isOfferKey = function isOfferKey(offerID) {
  return typeof offerID === 'string';
};

exports.isOfferKey = isOfferKey;

var extractDataFromOfferKey = function extractDataFromOfferKey(key) {
  var _split = (0, _ramda.split)('-', key),
      _split2 = _slicedToArray(_split, 2),
      id = _split2[0],
      meta = _split2[1];

  return {
    id: id,
    meta: meta ? JSON.parse(meta) : null,
    key: key
  };
};

exports.extractDataFromOfferKey = extractDataFromOfferKey;
var presetEmpyShapeForActualizedOffer = (0, _ramda.curryN)(2, function (offerID, actualizedOffers) {
  return actualizedOffers[offerID] ? (0, _ramda.assoc)(offerID, {}, actualizedOffers) : actualizedOffers[offerID];
});
exports.presetEmpyShapeForActualizedOffer = presetEmpyShapeForActualizedOffer;