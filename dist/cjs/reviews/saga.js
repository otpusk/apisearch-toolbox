"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../auth/selectors");
var _actions = require("./actions");
function getTurpravdaWidgetSaga(_ref) {
  let {
    payload: hotelID
  } = _ref;
  return function* () {
    const lang = yield (0, _effects.select)(_ref2 => {
      let {
        auth
      } = _ref2;
      return auth.getIn(['otpusk', 'lang']);
    });
    try {
      const widget = yield (0, _effects.call)(_jsonApi.getTurpravdaHotelInformer, hotelID, {
        count: 10,
        lang
      });
      yield (0, _effects.put)((0, _actions.setTurpravdaWidget)(hotelID, widget));
    } catch (error) {
      console.log(error);
      yield (0, _effects.put)((0, _actions.getTurpravdaWidgetFail)(error));
    }
  }();
}
function getTurpravdaReviewsSaga(_ref3) {
  let {
    payload: hotelID
  } = _ref3;
  return function* () {
    const lang = yield (0, _effects.select)(_selectors.getLang);
    try {
      const reviews = yield (0, _effects.call)(_jsonApi.getTurpravdaHotelReviews, hotelID, lang);
      yield (0, _effects.put)((0, _actions.setTurpravdaReviews)(hotelID, reviews));
    } catch (error) {
      yield (0, _effects.put)((0, _actions.getTurpravdaReviewsFail)(error));
    }
  }();
}
function* _default() {
  yield (0, _effects.takeEvery)(_actions.getTurpravdaWidget, getTurpravdaWidgetSaga);
  yield (0, _effects.takeEvery)(_actions.getTurpravdaReviews, getTurpravdaReviewsSaga);
}