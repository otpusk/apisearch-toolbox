"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTurpravdaWidget = exports.setTurpravdaReviews = exports.getTurpravdaWidgetFail = exports.getTurpravdaWidget = exports.getTurpravdaReviewsFail = exports.getTurpravdaReviews = void 0;
var _reduxActions = require("redux-actions");
const {
  getTurpravdaWidget,
  getTurpravdaWidgetFail,
  setTurpravdaWidget,
  getTurpravdaReviews,
  getTurpravdaReviewsFail,
  setTurpravdaReviews
} = (0, _reduxActions.createActions)({
  getTurpravdaWidget: hotelID => hotelID,
  getTurpravdaWidgetFail: error => error,
  setTurpravdaWidget: (hotelID, widget) => ({
    hotelID,
    widget
  }),
  getTurpravdaReviews: hotelID => hotelID,
  getTurpravdaReviewsFail: error => error,
  setTurpravdaReviews: (hotelID, reviews) => ({
    hotelID,
    reviews
  })
}, {
  prefix: 'API_TOOLBOX'
});
exports.setTurpravdaReviews = setTurpravdaReviews;
exports.getTurpravdaReviewsFail = getTurpravdaReviewsFail;
exports.getTurpravdaReviews = getTurpravdaReviews;
exports.setTurpravdaWidget = setTurpravdaWidget;
exports.getTurpravdaWidgetFail = getTurpravdaWidgetFail;
exports.getTurpravdaWidget = getTurpravdaWidget;