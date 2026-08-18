"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTurpravdaWidget = exports.getTurpravdaWidgetFail = exports.getTurpravdaWidget = void 0;
var _reduxActions = require("redux-actions");
const {
  getTurpravdaWidget,
  getTurpravdaWidgetFail,
  setTurpravdaWidget
} = (0, _reduxActions.createActions)({
  getTurpravdaWidget: hotelID => hotelID,
  getTurpravdaWidgetFail: error => error,
  setTurpravdaWidget: (hotelID, widget) => ({
    hotelID,
    widget
  })
}, {
  prefix: 'API_TOOLBOX'
});
exports.setTurpravdaWidget = setTurpravdaWidget;
exports.getTurpravdaWidgetFail = getTurpravdaWidgetFail;
exports.getTurpravdaWidget = getTurpravdaWidget;