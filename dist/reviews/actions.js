"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTurpravdaWidget = exports.getTurpravdaWidget = void 0;

var _reduxActions = require("redux-actions");

var _createActions = (0, _reduxActions.createActions)({
  getTurpravdaWidget: function getTurpravdaWidget(hotelID) {
    return hotelID;
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
    setTurpravdaWidget = _createActions.setTurpravdaWidget;

exports.setTurpravdaWidget = setTurpravdaWidget;
exports.getTurpravdaWidget = getTurpravdaWidget;