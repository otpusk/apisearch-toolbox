"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectOperators = exports.offersByKey = exports.isStart = exports.isSetSearch = exports.isSetHotelAtPrices = exports.isSearch = exports.isProccess = exports.isFail = exports.isDone = exports.hotelsByKey = exports.getTotal = exports.getSearchProgressByPercent = exports.getSearchCountry = exports.getPrices = exports.getOperatorsWithMinPrice = exports.getOperatorsByHotelID = exports.getOperatorLink = exports.getOffersFromPrices = exports.getNightsWithMinPrice = exports.getHotelsTotal = exports.getHotelsMarkers = exports.getHotelsByMinPrice = exports.getFoodsWithMinPrice = exports.getFlattenPrices = exports.getError = exports.getChart = exports.getCenterByHotelsMarkers = exports.getCategoryWithMinPrice = exports.getAvailableDates = exports.createGetDeparturesWithMinPrice = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
var _static = require("@otpusk/json-api/dist/static");
var _geolib = require("geolib");
var _selectors = require("./../offers/selectors");
var _selectors2 = require("./../hotels/selectors");
var _selectors3 = require("./../queries/selectors");
var _selectors4 = require("./../geo/selectors");
var _fn = require("./../queries/fn");
var _resultsMemory = require("./saga/workers/getResultsWorker/resultsMemory");
var _helpers = require("./helpers");
var _excluded = ["offer"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var domain = function domain(_) {
  return _.search;
};
var getQueryID = function getQueryID(_, _ref) {
  var queryID = _ref.queryID;
  return queryID;
};
var EMPTY_OBJ = {};
var EMPTY_ARRAY = [];
var getOffersListFromSearchMemory = function getOffersListFromSearchMemory(queryID) {
  return R.prop(queryID, _resultsMemory.memoryInstances) ? R.call(R.pipe(function (memory) {
    return memory.getValues();
  }, R.prop('offersHub'), R.toPairs, R.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      offer = _ref3[1];
    return offer;
  })), _resultsMemory.memoryInstances[queryID]) : [];
};
var getUnusedPricesFromSearchMemory = function getUnusedPricesFromSearchMemory(queryID) {
  return R.call(R.ifElse(Boolean, function (memory) {
    return memory.getValues().unusedPrices;
  }, R.always([])), _resultsMemory.memoryInstances[queryID]);
};
var getUnusedHotelsFromSearchMemory = function getUnusedHotelsFromSearchMemory(queryID) {
  return R.call(R.pipe(getUnusedPricesFromSearchMemory, R.map(R.prop('hotelID'))), queryID);
};
var getResults = (0, _reselect.createSelector)(domain, function (search) {
  return search.get('results');
});
var searchByKey = (0, _reselect.createSelector)(getResults, getQueryID, function (results, key) {
  return results.get(key) ? results.get(key).toObject() : EMPTY_OBJ;
});
var getSearchCountry = exports.getSearchCountry = (0, _reselect.createSelector)(searchByKey, R.propOr(EMPTY_OBJ, 'country'));
var getTotal = exports.getTotal = (0, _reselect.createSelector)(searchByKey, R.propOr(0, 'total'));
var isSetSearch = exports.isSetSearch = (0, _reselect.createSelector)(searchByKey, function (search) {
  return !R.isEmpty(search);
});
var getHotelsByPages = function getHotelsByPages() {
  return (0, _reselect.createSelector)(searchByKey, R.pipe(R.prop('hotels'), R.values));
};
var getHotelsByMinPrice = exports.getHotelsByMinPrice = function getHotelsByMinPrice() {
  return (0, _reselect.createSelector)(getHotelsByPages(), (0, _selectors.getOffers)(), _selectors3.getQuery, function (pages, offersMap, query) {
    return R.map(function (hotelsMap) {
      return R.call(R.pipe(R.toPairs, R.map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          hotelID = _ref5[0],
          offersIDs = _ref5[1];
        return {
          hotelID: hotelID,
          offersIDs: R.call(R.pipe(R.map(function (id) {
            return offersMap[id];
          }), (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY))), offersIDs)
        };
      }), _helpers.sortHotelsByMinOffer), hotelsMap);
    }, pages);
  });
};
var hotelsByKey = exports.hotelsByKey = function hotelsByKey() {
  return (0, _reselect.createSelector)(getHotelsByPages(), R.reduce(R.mergeRight, {}));
};
var offersByKey = exports.offersByKey = function offersByKey() {
  return (0, _reselect.createSelector)(hotelsByKey(), (0, _selectors.getOffers)(), function (hotels, offers) {
    return R.pipe(R.values, R.flatten, R.map(function (offerID) {
      return R.prop(offerID, offers);
    }), R.filter(Boolean))(hotels);
  });
};
var selectOperators = exports.selectOperators = function selectOperators() {
  return (0, _reselect.createSelector)(searchByKey, function (_ref6) {
    var operators = _ref6.operators;
    return operators;
  });
};
var getSearchProgressByPercent = exports.getSearchProgressByPercent = (0, _reselect.createSelector)(selectOperators(), function (operators) {
  return R.call(R.pipe(R.values, R.filter(Boolean), R.length, function (doneOperatorsCount) {
    return doneOperatorsCount * 100 / R.keys(operators).length;
  }, R.when(function (count) {
    return !count;
  }, R.always(0))), operators);
});
var getPrices = exports.getPrices = (0, _reselect.createSelector)(searchByKey, R.prop('prices'));
var getFlattenPrices = exports.getFlattenPrices = function getFlattenPrices() {
  return (0, _reselect.createSelector)(getPrices, function (prices) {
    return prices ? R.flatten(prices) : EMPTY_ARRAY;
  });
};
var getOffersFromPrices = exports.getOffersFromPrices = function getOffersFromPrices() {
  return (0, _reselect.createSelector)(getPrices, (0, _selectors.getOffers)(), function (pricesByPages, hub) {
    return pricesByPages ? R.call(R.pipe(R.map(function (page) {
      return R.map(function (price) {
        return price.offers;
      }, page);
    }), R.flatten, R.map(function (offerID) {
      return hub[offerID];
    })), pricesByPages) : EMPTY_ARRAY;
  });
};
var isSetHotelAtPrices = exports.isSetHotelAtPrices = function isSetHotelAtPrices() {
  return (0, _reselect.createSelector)(getFlattenPrices(), function (_, _ref7) {
    var hotelID = _ref7.hotelID;
    return hotelID;
  }, function (prices, hotelID) {
    return R.any(R.propEq(hotelID, 'hotelID'), prices);
  });
};
var getError = exports.getError = function getError() {
  return (0, _reselect.createSelector)(searchByKey, R.prop('error'));
};
var isStart = exports.isStart = (0, _reselect.createSelector)(searchByKey, function (_ref8) {
  var status = _ref8.status;
  return status === 'starting';
});
var isDone = exports.isDone = (0, _reselect.createSelector)(searchByKey, function (_ref9) {
  var status = _ref9.status;
  return status === 'done';
});
var isSearch = exports.isSearch = (0, _reselect.createSelector)(searchByKey, function (_ref10) {
  var status = _ref10.status;
  return status === 'processing';
});
var isFail = exports.isFail = (0, _reselect.createSelector)(searchByKey, function (_ref11) {
  var status = _ref11.status;
  return status === 'failed';
});
var isProccess = exports.isProccess = (0, _reselect.createSelector)(isStart, isSearch, R.or);
var getOperatorsWithMinPrice = exports.getOperatorsWithMinPrice = function getOperatorsWithMinPrice() {
  return (0, _reselect.createSelector)(selectOperators(), getOffersFromPrices(), getQueryID, _selectors3.getQuery, function (operatorsObject, offers, queryID, query) {
    return operatorsObject ? R.call(R.pipe(R.toPairs, R.map(function (_ref12) {
      var _ref13 = _slicedToArray(_ref12, 2),
        id = _ref13[0],
        isReady = _ref13[1];
      return {
        id: Number(id),
        isReady: isReady,
        offer: R.call(R.pipe(R.filter(function (_ref14) {
          var operator = _ref14.operator;
          return operator === Number(id);
        }), (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head), R.concat(offers, getOffersListFromSearchMemory(queryID)))
      };
    }), R.sort(R.ascend(R.pathOr(Infinity, ['offer', 'price', query.get(_fn.QUERY_PARAMS.CURRENCY)]))), R.map(function (_ref15) {
      var offer = _ref15.offer,
        entity = _objectWithoutProperties(_ref15, _excluded);
      return R.mergeAll([entity, {
        offerID: R.prop('id', offer)
      }]);
    })), operatorsObject) : EMPTY_ARRAY;
  });
};
var getFoodsWithMinPrice = exports.getFoodsWithMinPrice = function getFoodsWithMinPrice() {
  return (0, _reselect.createSelector)(getOffersFromPrices(), getQueryID, _selectors3.getQuery, function (offers, queryID, query) {
    var groupedByFood = R.groupBy(R.prop('food'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
    return R.map(function (_ref16) {
      var code = _ref16.code;
      return {
        code: code,
        offerID: R.prop(code, groupedByFood) ? R.call(R.pipe(R.prop(code), (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), groupedByFood) : undefined
      };
    }, _static.FOODS);
  });
};
var getCategoryWithMinPrice = exports.getCategoryWithMinPrice = function getCategoryWithMinPrice() {
  return (0, _reselect.createSelector)(getFlattenPrices(), _selectors2.hotelsHub, (0, _selectors.getOffers)(), getQueryID, _selectors3.getQuery, function (prices, hotels, offers, queryID, query) {
    var categoriesAsArray = query ? R.map(R.head, R.toPairs(query.get(_fn.QUERY_PARAMS.CATEGORY).toObject())) : EMPTY_ARRAY;
    var groupedByCaregory = R.groupBy(R.path(['hotel', 'stars']), R.map(function (_ref17) {
      var hotelID = _ref17.hotelID,
        ids = _ref17.offers;
      return R.mergeAll([{
        hotel: hotels[hotelID]
      }, {
        offers: R.map(function (id) {
          return R.mergeAll([offers[id], {
            hotelID: hotelID
          }]);
        }, ids)
      }]);
    }, R.concat(prices, getUnusedPricesFromSearchMemory(queryID))));
    return R.map(function (category) {
      return _objectSpread({
        category: category
      }, R.call(R.ifElse(Boolean, R.pipe(R.map(R.prop('offers')), R.flatten, (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head, function (_ref18) {
        var id = _ref18.id,
          hotelID = _ref18.hotelID;
        return {
          offerID: id,
          hotelID: hotelID
        };
      }), R.always({
        offerID: undefined,
        hotelID: undefined
      })), R.prop(category, groupedByCaregory)));
    }, categoriesAsArray);
  });
};
var getNightsWithMinPrice = exports.getNightsWithMinPrice = function getNightsWithMinPrice() {
  return (0, _reselect.createSelector)(_selectors3.getQueryParam, getOffersFromPrices(), getQueryID, _selectors3.getQuery, function (durationByNights, offers, queryID, query) {
    var groupedByNights = R.groupBy(R.prop('nights'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
    if (R.isEmpty(groupedByNights)) {
      return EMPTY_ARRAY;
    }
    var nights = R.range(durationByNights.get('from'), R.inc(durationByNights.get('to')));
    return R.map(function (night) {
      return {
        night: night,
        offerID: R.prop(night, groupedByNights) ? R.call(R.pipe(R.prop(night), (0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), groupedByNights) : undefined
      };
    }, nights);
  });
};
var createGetDeparturesWithMinPrice = exports.createGetDeparturesWithMinPrice = function createGetDeparturesWithMinPrice() {
  return (0, _reselect.createSelector)((0, _selectors4.getDepartures)(), getOffersFromPrices(), getQueryID, _selectors3.getQuery, function (departures, offers, queryID, query) {
    var departuresIDsFromQuery = query ? query.get(_fn.QUERY_PARAMS.DEPARTURES).toArray() : EMPTY_ARRAY;
    var groupedByDeparture = R.groupBy(R.prop('departure'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
    var departuresAsMap = R.indexBy(R.prop('id'), departures);
    return R.map(function (id) {
      return R.mergeAll([departuresAsMap[id], {
        offerID: R.call(R.ifElse(Boolean, R.pipe((0, _helpers.sortOffersByMinPrice)(query.get(_fn.QUERY_PARAMS.CURRENCY)), R.head, R.prop('id')), R.always(undefined)), groupedByDeparture[id]),
        queryID: queryID
      }]);
    }, departuresIDsFromQuery);
  });
};
var getMeta = (0, _reselect.createSelector)(searchByKey, R.propOr(EMPTY_OBJ, 'meta'));
var getOperatorsLinks = (0, _reselect.createSelector)(getMeta, R.pathOr(EMPTY_OBJ, ['links', 'operators']));
var getOperatorLink = exports.getOperatorLink = (0, _reselect.createSelector)(getOperatorsLinks, function (_, _ref19) {
  var operatorID = _ref19.operatorID;
  return operatorID;
}, function (links, id) {
  return R.prop(id, links);
});
var getHotels = function getHotels() {
  return (0, _reselect.createSelector)(getFlattenPrices(), getQueryID, function (prices, queryID) {
    return R.concat(R.map(R.prop('hotelID'), prices), getUnusedHotelsFromSearchMemory(queryID));
  });
};
var getHotelsTotal = exports.getHotelsTotal = function getHotelsTotal() {
  return (0, _reselect.createSelector)(getHotels(), R.length);
};
var getOperatorsByHotelID = exports.getOperatorsByHotelID = function getOperatorsByHotelID() {
  return (0, _reselect.createSelector)(getFlattenPrices(), (0, _selectors.getOffers)(), (0, _selectors4.getOperatorsMap)(), function (_, _ref20) {
    var hotelID = _ref20.hotelID;
    return hotelID;
  }, function (prices, offersHub, operatorsMap, hotelID) {
    return R.isEmpty(prices) ? EMPTY_ARRAY : R.call(R.pipe(R.find(R.propEq(hotelID, 'hotelID')), R.propOr(EMPTY_ARRAY, 'offers'), R.map(function (id) {
      return offersHub[id].operator;
    }), R.uniq, R.map(function (id) {
      return operatorsMap[id];
    })), prices);
  });
};
var getCharts = (0, _reselect.createSelector)(domain, function (search) {
  return search.get('charts');
});
var getChart = exports.getChart = (0, _reselect.createSelector)(getCharts, getQueryID, function (charts, queryID) {
  return charts.get(queryID, EMPTY_ARRAY);
});
var getHotelsMarkers = exports.getHotelsMarkers = function getHotelsMarkers() {
  return (0, _reselect.createSelector)(getFlattenPrices(), _selectors2.hotelsHub, function (prices, hotels) {
    return R.filter(Boolean, R.map(R.pipe(function (_ref21) {
      var hotelID = _ref21.hotelID,
        _ref21$offers = _slicedToArray(_ref21.offers, 1),
        offerID = _ref21$offers[0];
      return R.mergeAll([hotels[hotelID], {
        offerID: offerID
      }]);
    }, R.ifElse(R.prop('location'), function (_ref22) {
      var id = _ref22.id,
        location = _ref22.location,
        offerID = _ref22.offerID,
        stars = _ref22.stars;
      return {
        hotelID: id,
        offerID: offerID,
        position: R.pick(['lat', 'lng'], location),
        stars: stars,
        zoom: location.zoom
      };
    }, R.always(null))), prices));
  });
};
var getCenterByHotelsMarkers = exports.getCenterByHotelsMarkers = function getCenterByHotelsMarkers() {
  return (0, _reselect.createSelector)(getHotelsMarkers(), function (markers) {
    return !R.isEmpty(markers) ? R.call(R.pipe(R.map(R.applySpec({
      latitude: R.path(['position', 'lat']),
      longitude: R.path(['position', 'lng'])
    })), _geolib.getCenter, R.applySpec({
      lat: R.prop('latitude'),
      lng: R.prop('longitude')
    })), markers) : undefined;
  });
};
var getAvailableDates = exports.getAvailableDates = R.useWith(function (availableDates, key) {
  return R.propOr(EMPTY_ARRAY, key, availableDates);
}, [R.pipe(domain, function (search) {
  return search.get('availableDates');
}), R.prop('key')]);