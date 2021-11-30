"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _effects = require("redux-saga/effects");

var _jsonApi = require("@otpusk/json-api");

var R = _interopRequireWildcard(require("ramda"));

var _actions = require("./actions");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getStaticDataSaga);

function getStaticDataSaga() {
  var _yield$select, token, lang, staticData;

  return regeneratorRuntime.wrap(function getStaticDataSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.take)(_actions.getStaticData);

        case 2:
          _context.next = 4;
          return (0, _effects.select)(function (_ref) {
            var auth = _ref.auth;
            return {
              token: auth.getIn(['otpusk', 'token']),
              lang: auth.getIn(['otpusk', 'lang'])
            };
          });

        case 4:
          _yield$select = _context.sent;
          token = _yield$select.token;
          lang = _yield$select.lang;
          _context.prev = 7;
          _context.next = 10;
          return (0, _effects.call)(_jsonApi.getStaticData, R.mergeAll([token, {
            lang: lang
          }]));

        case 10:
          staticData = _context.sent;
          _context.next = 13;
          return (0, _effects.put)((0, _actions.setStaticData)(staticData));

        case 13:
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](7);
          console.log(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[7, 15]]);
}

var _default = getStaticDataSaga;
exports["default"] = _default;