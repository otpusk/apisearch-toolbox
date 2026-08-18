"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsHub = exports.getHotelsMarkers = exports.getHotelsDescriptionsByOperatorHub = exports.getHotelPhotosByCategory = exports.getHotelPhotoCategories = exports.getHotelMarker = exports.getHotelDescriptionsByOperator = exports.getHotel = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const domain = _ => _.hotels;
const hotelKey = (_, key) => key;
const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];
const getHotelsStore = (0, _reselect.createSelector)(domain, hotels => hotels.get('store'));
const getHotelsMarkersStore = (0, _reselect.createSelector)(domain, hotels => hotels.get('markers'));
const getHotelsMarkers = exports.getHotelsMarkers = (0, _reselect.createSelector)(getHotelsMarkersStore, store => R.call(R.pipe(R.toPairs, R.map(_ref => {
  let [, hotel] = _ref;
  return {
    hotelID: hotel.id,
    position: R.pick(['lat', 'lng'], hotel.location),
    stars: hotel.stars,
    zoom: hotel.location.zoom
  };
})), store.toObject()));
const getHotelMarker = () => (0, _reselect.createSelector)(getHotelsMarkersStore, (_, _ref2) => {
  let {
    hotelID
  } = _ref2;
  return hotelID;
}, (store, id) => store.toObject()[id]);
exports.getHotelMarker = getHotelMarker;
const hotelsHub = exports.hotelsHub = (0, _reselect.createSelector)(getHotelsStore, R.ifElse(v => v.isEmpty(), R.always(EMPTY_OBJ), v => v.toJS()));
const getHotel = () => (0, _reselect.createSelector)(getHotelsStore, hotelKey, (store, key) => store.get(key.toString()));
exports.getHotel = getHotel;
const getHotelPhotoCategories = () => (0, _reselect.createSelector)(getHotel(), R.pipe(R.propOr(EMPTY_ARRAY, 'photosByCategory'), R.map(R.prop('category')), R.uniqBy(R.prop('id'))));
exports.getHotelPhotoCategories = getHotelPhotoCategories;
const getHotelPhotosByCategory = () => (0, _reselect.createSelector)(getHotel(), R.pipe(R.propOr(EMPTY_ARRAY, 'photosByCategory'), items => R.map(category => ({
  category,
  photos: R.pipe(R.filter(item => item.category.id === category.id), R.map(R.prop('photo')))(items)
}), R.uniqBy(R.prop('id'), R.map(R.prop('category'), items)))));
exports.getHotelPhotosByCategory = getHotelPhotosByCategory;
const getHotelsDescriptionsByOperatorHub = exports.getHotelsDescriptionsByOperatorHub = R.pipe(domain, hotels => hotels.get('descriptionsByOperator'));
const getHotelDescriptionsByOperator = exports.getHotelDescriptionsByOperator = R.converge((descriptions, operatorID) => descriptions[operatorID] ?? EMPTY_ARRAY, [getHotelsDescriptionsByOperatorHub, (_, _ref3) => {
  let {
    operatorID
  } = _ref3;
  return operatorID;
}]);