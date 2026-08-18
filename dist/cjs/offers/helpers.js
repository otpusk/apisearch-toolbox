"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presetEmpyShapeForActualizedOffer = exports.isOfferKey = exports.generateOfferKey = exports.extractDataFromOfferKey = void 0;
var _ramda = require("ramda");
const generateOfferKey = function (id) {
  let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return `${id}-${JSON.stringify(meta)}`;
};
exports.generateOfferKey = generateOfferKey;
const isOfferKey = offerID => typeof offerID === 'string';
exports.isOfferKey = isOfferKey;
const extractDataFromOfferKey = key => {
  const [id, meta] = (0, _ramda.split)('-', key);
  return {
    id,
    meta: meta ? JSON.parse(meta) : null,
    key
  };
};
exports.extractDataFromOfferKey = extractDataFromOfferKey;
const presetEmpyShapeForActualizedOffer = exports.presetEmpyShapeForActualizedOffer = (0, _ramda.ifElse)(Boolean, prevShape => prevShape, (0, _ramda.always)({}));