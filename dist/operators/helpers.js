"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseRateHash = exports.createRateHash = void 0;
const createRateHash = (from, to) => [from, to].join('-');
exports.createRateHash = createRateHash;
const parseRateHash = hash => {
  const [from = '', to = ''] = hash.split('-');
  return {
    from,
    to
  };
};
exports.parseRateHash = parseRateHash;