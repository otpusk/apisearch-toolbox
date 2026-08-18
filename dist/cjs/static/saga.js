"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var R = _interopRequireWildcard(require("ramda"));
var _actions = require("./actions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function* getStaticDataSaga() {
  yield (0, _effects.take)(_actions.getStaticData);
  const {
    token,
    lang
  } = yield (0, _effects.select)(_ref => {
    let {
      auth
    } = _ref;
    return {
      token: auth.getIn(['otpusk', 'token']),
      lang: auth.getIn(['otpusk', 'lang'])
    };
  });
  try {
    const staticData = yield (0, _effects.call)(_jsonApi.getStaticData, R.mergeAll([token, {
      lang
    }]));
    yield (0, _effects.put)((0, _actions.setStaticData)(staticData));
  } catch (e) {
    console.log(e);
  }
}
var _default = exports.default = getStaticDataSaga;