"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operatorsActions = void 0;

var _reduxActions = require("redux-actions");

var operatorsActions = (0, _reduxActions.createActions)({
  GET_OPERATORS: function GET_OPERATORS(countryId, options) {
    return {
      countryId: countryId,
      options: options
    };
  },
  GET_OPERATORS_SUCCESS: function GET_OPERATORS_SUCCESS(countryId, operators) {
    return {
      countryId: countryId,
      operators: operators
    };
  },
  GET_OPERATORS_FAIL: function GET_OPERATORS_FAIL(error) {
    return error;
  },
  SET_UI_FLAG: function SET_UI_FLAG(path, value) {
    return {
      path: path,
      value: value
    };
  }
}, {
  prefix: 'API_TOOLBOX'
});
exports.operatorsActions = operatorsActions;