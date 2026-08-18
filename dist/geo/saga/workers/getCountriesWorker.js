"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountriesWorker = getCountriesWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _actions = require("../../actions");
function getCountriesWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      options = {
        'with': 'price'
      },
      methodVersion
    } = payload;
    try {
      const {
        token,
        lang
      } = yield (0, _effects.select)(_ref2 => {
        let {
          auth
        } = _ref2;
        return {
          token: auth.getIn(['otpusk', 'token']),
          lang: auth.getIn(['otpusk', 'lang'], 'rus')
        };
      });
      const countries = yield (0, _effects.call)(_jsonApi.getToursCountries, token, {
        lang,
        ...options
      }, methodVersion);
      yield (0, _effects.put)(_actions.geoActions.getCountriesSuccess(countries));
    } catch (error) {
      yield (0, _effects.put)(_actions.geoActions.getCountriesFail(error));
    }
  }();
}