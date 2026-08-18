"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeoTreeWorker = getGeoTreeWorker;
var _effects = require("redux-saga/effects");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
var _jsonApi = require("@otpusk/json-api");
// Core

// Instruments

function getGeoTreeWorker(_ref) {
  let {
    payload: {
      countryId,
      withPrice,
      depth = 'city'
    }
  } = _ref;
  return function* () {
    const token = yield (0, _effects.select)(_selectors.getToken);
    const lang = yield (0, _effects.select)(_selectors.getLang);
    const options = {
      ...token,
      lang,
      depth,
      id: countryId,
      ...(withPrice ? {
        with: 'price'
      } : {})
    };
    try {
      const geoTree = yield (0, _effects.call)(_jsonApi.getToursGeoTree, options);
      yield (0, _effects.put)(_actions.geoActions.getGeoTreeSuccess(countryId, geoTree));
    } catch (error) {
      yield (0, _effects.put)(_actions.geoActions.getGeoTreeFail(error));
    }
  }();
}