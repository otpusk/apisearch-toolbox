"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actualizeOfferSaga = actualizeOfferSaga;
var _effects = require("redux-saga/effects");
var R = _interopRequireWildcard(require("ramda"));
var _moment = _interopRequireDefault(require("moment"));
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../auth/selectors");
var _fn = require("../../queries/fn");
var _actions = require("../actions");
var _constants = require("../constants");
var _helpers = require("../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CHILD_BIRTHDATE_INPUT_FORMAT = 'DD.MM.YYYY';
const CHILD_BIRTHDATE_OUTPUT_FORMAT = 'YYYY-MM-DD';
const areAllChildrenBirthDates = children => children.length > 0 && children.every(value => typeof value === 'string');
const mapChildrenToBirthDates = children => children.map(value => (0, _moment.default)(value, CHILD_BIRTHDATE_INPUT_FORMAT).format(CHILD_BIRTHDATE_OUTPUT_FORMAT));
const getTextStatusByCode = code => R.call(R.cond([[R.equals(8), R.always(_constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_HOTEL)], [R.equals(7), R.always(_constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_TRANSPORT_TO)], [R.equals(6), R.always(_constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_TRANSPORT_FROM)], [R.equals(5), R.always(_constants.ACTUALIZED_OFFER_STATUS.ACTUALIZED)], [R.equals(4), R.always(_constants.ACTUALIZED_OFFER_STATUS.UPDATED)], [R.equals(3), R.always(_constants.ACTUALIZED_OFFER_STATUS.NEW_PRICE)], [R.equals(2), R.always(_constants.ACTUALIZED_OFFER_STATUS.NOT_FOUND)], [R.equals(1), R.always(_constants.ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION)], [R.equals(0), R.always(_constants.ACTUALIZED_OFFER_STATUS.INVALID_REQUEST)]]), code);
const generatePeopleString = (adults, children) => R.call(R.pipe(R.filter(Boolean), R.join('')), [adults, (0, _fn.compileChildrenToPeopleField)(children)]);
function actualizeOfferSaga(_ref) {
  let {
    payload: {
      adults,
      children = [],
      offerID,
      currency,
      withShortCode
    }
  } = _ref;
  return function* () {
    const token = yield (0, _effects.select)(_selectors.getToken);
    const lang = yield (0, _effects.select)(_selectors.getLang);
    yield (0, _effects.put)(_actions.offersActions.startActualizeOffer(offerID));
    try {
      const {
        code,
        offer: nextOffer,
        message
      } = yield (0, _effects.call)(_jsonApi.getToursActual, R.mergeAll([token, {
        lang
      }]), (0, _helpers.isOfferKey)(offerID) ? (0, _helpers.extractDataFromOfferKey)(offerID).id : offerID, generatePeopleString(adults, children), currency, withShortCode, areAllChildrenBirthDates(children) ? mapChildrenToBirthDates(children) : undefined);
      yield (0, _effects.put)(_actions.offersActions.setActualizedStatus(offerID, getTextStatusByCode(code)));
      if (nextOffer) {
        yield (0, _effects.put)(_actions.offersActions.setActualizedOffer(offerID, nextOffer));
      }
      message && (yield (0, _effects.put)(_actions.offersActions.setMessageByActualizedOffer(offerID, message)));
    } catch (error) {
      console.log(error);
      yield (0, _effects.put)(_actions.offersActions.setActualizedStatus(offerID, _constants.ACTUALIZED_OFFER_STATUS.INVALID_REQUEST));
      yield (0, _effects.put)(_actions.offersActions.failActualizeOffer(offerID));
    } finally {
      yield (0, _effects.put)(_actions.offersActions.endActualizeOffer(offerID));
    }
  }();
}