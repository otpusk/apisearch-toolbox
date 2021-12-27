"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectOperatorsWithMinPrice = exports.selectOperators = exports.offersByKey = exports.isStart = exports.isSetSearch = exports.isSearch = exports.isProccess = exports.isFail = exports.isDone = exports.hotelsByKey = exports.getTotal = exports.getSearchProgressByPercent = exports.getPrices = exports.getOperatorsWithMinPrice = exports.getOperatorsByHotelID = exports.getOperatorLink = exports.getOffersFromPrices = exports.getNightsWithMinPrice = exports.getHotelsTotal = exports.getHotelsMarkers = exports.getHotelsByMinPrice = exports.getFoodsWithMinPrice = exports.getFlattenPrices = exports.getError = exports.getChart = exports.getCenterByHotelsMarkers = exports.getCategoryWithMinPrice = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

var _static = require("@otpusk/json-api/dist/static");

var _geolib = require("geolib");

var _selectors = require("./../offers/selectors");

var _selectors2 = require("./../hotels/selectors");

var _selectors3 = require("./../queries/selectors");

var _selectors4 = require("./../geo/selectors");

var _resultsMemory = require("./saga/workers/getResultsWorker/resultsMemory");

var _helpers = require("./helpers");

var _excluded = ["offer"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
var getTotal = (0, _reselect.createSelector)(searchByKey, R.propOr(0, 'total'));
exports.getTotal = getTotal;
var isSetSearch = (0, _reselect.createSelector)(searchByKey, function (search) {
  return !R.isEmpty(search);
});
exports.isSetSearch = isSetSearch;

var getHotelsByPages = function getHotelsByPages() {
  return (0, _reselect.createSelector)(searchByKey, R.pipe(R.prop('hotels'), R.values));
};

var getHotelsByMinPrice = function getHotelsByMinPrice() {
  return (0, _reselect.createSelector)(getHotelsByPages(), (0, _selectors.getOffers)(), function (pages, offersMap) {
    return R.map(function (hotelsMap) {
      return R.call(R.pipe(R.toPairs, R.map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            hotelID = _ref5[0],
            offersIDs = _ref5[1];

        return {
          hotelID: hotelID,
          offersIDs: R.call(R.pipe(R.map(function (id) {
            return offersMap[id];
          }), _helpers.sortOffersByMinPrice), offersIDs)
        };
      }), _helpers.sortHotelsByMinOffer), hotelsMap);
    }, pages);
  });
};

exports.getHotelsByMinPrice = getHotelsByMinPrice;

var hotelsByKey = function hotelsByKey() {
  return (0, _reselect.createSelector)(getHotelsByPages(), R.reduce(R.mergeRight, {}));
};

exports.hotelsByKey = hotelsByKey;

var offersByKey = function offersByKey() {
  return (0, _reselect.createSelector)(hotelsByKey(), (0, _selectors.getOffers)(), function (hotels, offers) {
    return R.pipe(R.values, R.flatten, R.map(function (offerID) {
      return R.prop(offerID, offers);
    }), R.filter(Boolean))(hotels);
  });
};

exports.offersByKey = offersByKey;

var selectOperators = function selectOperators() {
  return (0, _reselect.createSelector)(searchByKey, function (_ref6) {
    var operators = _ref6.operators;
    return operators;
  });
};

exports.selectOperators = selectOperators;
var getSearchProgressByPercent = (0, _reselect.createSelector)(selectOperators(), function (operators) {
  return R.call(R.pipe(R.values, R.filter(Boolean), R.length, function (doneOperatorsCount) {
    return doneOperatorsCount * 100 / R.keys(operators).length;
  }, R.when(function (count) {
    return !count;
  }, R.always(0))), operators);
});
exports.getSearchProgressByPercent = getSearchProgressByPercent;

var selectOperatorsWithMinPrice = function selectOperatorsWithMinPrice() {
  return (0, _reselect.createSelector)(selectOperators(), offersByKey(), function (operators, offers) {
    return R.pipe(R.groupBy(R.prop('operator')), function (grouped) {
      return R.map(function (oid) {
        return [R.pipe(R.set(R.lensProp('completed'), R.prop(oid, operators)), R.set(R.lensProp('id'), Number(oid)))({}), R.prop(oid, grouped)];
      }, R.keys(operators));
    }, R.map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          operator = _ref8[0],
          grouped = _ref8[1];

      return [operator, R.when(Boolean, R.pipe(_helpers.sortOffersByMinPrice, R.prop(0)))(grouped)];
    }))(offers);
  });
};

exports.selectOperatorsWithMinPrice = selectOperatorsWithMinPrice;
var getPrices = (0, _reselect.createSelector)(searchByKey, R.prop('prices'));
exports.getPrices = getPrices;

var getFlattenPrices = function getFlattenPrices() {
  return (0, _reselect.createSelector)(getPrices, function (prices) {
    return prices ? R.flatten(prices) : EMPTY_ARRAY;
  });
};

exports.getFlattenPrices = getFlattenPrices;

var getOffersFromPrices = function getOffersFromPrices() {
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

exports.getOffersFromPrices = getOffersFromPrices;

var getError = function getError() {
  return (0, _reselect.createSelector)(searchByKey, R.prop('error'));
};

exports.getError = getError;
var isStart = (0, _reselect.createSelector)(searchByKey, function (_ref9) {
  var status = _ref9.status;
  return status === 'starting';
});
exports.isStart = isStart;
var isDone = (0, _reselect.createSelector)(searchByKey, function (_ref10) {
  var status = _ref10.status;
  return status === 'done';
});
exports.isDone = isDone;
var isSearch = (0, _reselect.createSelector)(searchByKey, function (_ref11) {
  var status = _ref11.status;
  return status === 'processing';
});
exports.isSearch = isSearch;
var isFail = (0, _reselect.createSelector)(searchByKey, function (_ref12) {
  var status = _ref12.status;
  return status === 'failed';
});
exports.isFail = isFail;
var isProccess = (0, _reselect.createSelector)(isStart, isSearch, R.or);
exports.isProccess = isProccess;

var getOperatorsWithMinPrice = function getOperatorsWithMinPrice() {
  return (0, _reselect.createSelector)(selectOperators(), getOffersFromPrices(), getQueryID, function (operatorsMap, offers, queryID) {
    return R.call(R.pipe(R.toPairs, R.map(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          id = _ref14[0],
          isReady = _ref14[1];

      return {
        id: Number(id),
        isReady: isReady,
        offer: R.call(R.pipe(R.filter(function (_ref15) {
          var operator = _ref15.operator;
          return operator === Number(id);
        }), _helpers.sortOffersByMinPrice, R.head), R.concat(offers, getOffersListFromSearchMemory(queryID)))
      };
    }), R.sort(R.ascend(R.pathOr(Infinity, ['offer', 'price', 'uah']))), R.map(function (_ref16) {
      var offer = _ref16.offer,
          entity = _objectWithoutProperties(_ref16, _excluded);

      return R.mergeAll([entity, {
        offerID: R.prop('id', offer)
      }]);
    })), operatorsMap);
  });
};

exports.getOperatorsWithMinPrice = getOperatorsWithMinPrice;

var getFoodsWithMinPrice = function getFoodsWithMinPrice() {
  return (0, _reselect.createSelector)(getOffersFromPrices(), getQueryID, function (offers, queryID) {
    var groupedByFood = R.groupBy(R.prop('food'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
    return R.map(function (_ref17) {
      var code = _ref17.code;
      return {
        code: code,
        offerID: R.prop(code, groupedByFood) ? R.call(R.pipe(R.prop(code), _helpers.sortOffersByMinPrice, R.head, R.prop('id')), groupedByFood) : undefined
      };
    }, _static.FOODS);
  });
};

exports.getFoodsWithMinPrice = getFoodsWithMinPrice;

var getCategoryWithMinPrice = function getCategoryWithMinPrice() {
  return (0, _reselect.createSelector)(_selectors3.getQueryParam, getFlattenPrices(), _selectors2.hotelsHub, (0, _selectors.getOffers)(), getQueryID, // eslint-disable-next-line max-params
  function (categoryMap, prices, hotels, offers, queryID) {
    var groupedByCaregory = R.groupBy(R.path(['hotel', 'stars']), R.map(function (_ref18) {
      var hotelID = _ref18.hotelID,
          ids = _ref18.offers;
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
    return R.map(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 1),
          category = _ref20[0];

      return _objectSpread({
        category: category
      }, R.call(R.ifElse(Boolean, R.pipe(R.map(R.prop('offers')), R.flatten, _helpers.sortOffersByMinPrice, R.head, function (_ref21) {
        var id = _ref21.id,
            hotelID = _ref21.hotelID;
        return {
          offerID: id,
          hotelID: hotelID
        };
      }), R.always({})), R.prop(category, groupedByCaregory)));
    }, R.toPairs(categoryMap.toObject()));
  });
};

exports.getCategoryWithMinPrice = getCategoryWithMinPrice;

var getNightsWithMinPrice = function getNightsWithMinPrice() {
  return (0, _reselect.createSelector)(_selectors3.getQueryParam, getOffersFromPrices(), getQueryID, function (durationByNights, offers, queryID) {
    var groupedByNights = R.groupBy(R.prop('nights'), R.concat(offers, getOffersListFromSearchMemory(queryID)));
    var nights = R.range(R.dec(durationByNights.get('from')), durationByNights.get('to'));
    return R.map(function (night) {
      return {
        night: night,
        offerID: R.prop(night, groupedByNights) ? R.call(R.pipe(R.prop(night), _helpers.sortOffersByMinPrice, R.head, R.prop('id')), groupedByNights) : undefined
      };
    }, nights);
  });
};

exports.getNightsWithMinPrice = getNightsWithMinPrice;
var getMeta = (0, _reselect.createSelector)(searchByKey, R.propOr(EMPTY_OBJ, 'meta'));
var getOperatorsLinks = (0, _reselect.createSelector)(getMeta, R.pathOr(EMPTY_OBJ, ['links', 'operators']));
var getOperatorLink = (0, _reselect.createSelector)(getOperatorsLinks, function (_, _ref22) {
  var operatorID = _ref22.operatorID;
  return operatorID;
}, function (links, id) {
  return R.prop(id, links);
});
exports.getOperatorLink = getOperatorLink;

var getHotels = function getHotels() {
  return (0, _reselect.createSelector)(getFlattenPrices(), getQueryID, function (prices, queryID) {
    return R.concat(R.map(R.prop('hotelID'), prices), getUnusedHotelsFromSearchMemory(queryID));
  });
};

var getHotelsTotal = function getHotelsTotal() {
  return (0, _reselect.createSelector)(getHotels(), R.length);
};

exports.getHotelsTotal = getHotelsTotal;

var getOperatorsByHotelID = function getOperatorsByHotelID() {
  return (0, _reselect.createSelector)(getFlattenPrices(), (0, _selectors.getOffers)(), (0, _selectors4.getOperatorsMap)(), function (_, _ref23) {
    var hotelID = _ref23.hotelID;
    return hotelID;
  }, function (prices, offersHub, operatorsMap, hotelID) {
    return R.call(R.pipe(R.find(R.propEq('hotelID', hotelID)), R.prop('offers'), R.map(function (id) {
      return offersHub[id].operator;
    }), R.uniq, R.map(function (id) {
      return operatorsMap[id];
    })), prices);
  });
};

exports.getOperatorsByHotelID = getOperatorsByHotelID;
var getCharts = (0, _reselect.createSelector)(domain, function (search) {
  return search.get('charts');
});
var getChart = (0, _reselect.createSelector)(getCharts, getQueryID, function (charts, queryID) {
  return charts.get(queryID, EMPTY_ARRAY);
});
exports.getChart = getChart;

var getHotelsMarkers = function getHotelsMarkers() {
  return (0, _reselect.createSelector)(getFlattenPrices(), _selectors2.hotelsHub, function (prices, hotels) {
    return R.filter(Boolean, R.map(R.pipe(function (_ref24) {
      var hotelID = _ref24.hotelID,
          _ref24$offers = _slicedToArray(_ref24.offers, 1),
          offerID = _ref24$offers[0];

      return R.mergeAll([hotels[hotelID], {
        offerID: offerID
      }]);
    }, R.ifElse(R.prop('location'), function (_ref25) {
      var id = _ref25.id,
          location = _ref25.location,
          offerID = _ref25.offerID,
          stars = _ref25.stars;
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

exports.getHotelsMarkers = getHotelsMarkers;

var getCenterByHotelsMarkers = function getCenterByHotelsMarkers() {
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

exports.getCenterByHotelsMarkers = getCenterByHotelsMarkers;