"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTurpravdaWidget = exports.getTurpravdaWidgetFail = exports.getTurpravdaWidget = void 0;

var _reduxActions = require("redux-actions");

var _createActions = (0, _reduxActions.createActions)({
  getTurpravdaWidget: function getTurpravdaWidget(hotelID) {
    return hotelID;
  },
  getTurpravdaWidgetFail: function getTurpravdaWidgetFail(error) {
    return error;
  },
  setTurpravdaWidget: function setTurpravdaWidget(hotelID, widget) {
    return {
      hotelID: hotelID,
      widget: widget
    };
  }
}, {
  prefix: 'API_TOOLBOX'
}),
    getTurpravdaWidget = _createActions.getTurpravdaWidget,
    getTurpravdaWidgetFail = _createActions.getTurpravdaWidgetFail,
    setTurpravdaWidget = _createActions.setTurpravdaWidget;

exports.setTurpravdaWidget = setTurpravdaWidget;
exports.getTurpravdaWidgetFail = getTurpravdaWidgetFail;
exports.getTurpravdaWidget = getTurpravdaWidget;