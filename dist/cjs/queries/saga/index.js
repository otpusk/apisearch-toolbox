"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultDepartureDirection = getDefaultDepartureDirection;
var _effects = require("redux-saga/effects");
var _ramda = require("ramda");
var _actions = require("../../geo/actions");
var _selectors = require("../../geo/selectors");
function getDefaultDepartureDirection(_ref) {
  let {
    defaultDepartureID,
    geoID
  } = _ref;
  return function* () {
    const shouldFetchDepartureCities = yield (0, _effects.select)(state => (0, _ramda.isEmpty)((0, _selectors.getDepartures)()(state, {
      geoID
    })));
    if (shouldFetchDepartureCities) {
      yield (0, _effects.put)(_actions.geoActions.getDepartureCities(geoID, '2.6'));
      yield (0, _effects.race)([(0, _effects.take)(_actions.geoActions.getDepartureCitiesSuccess), (0, _effects.take)(_actions.geoActions.getDepartureCitiesFail)]);
    }
    const departureCities = yield (0, _effects.select)(state => (0, _selectors.getDepartures)()(state, {
      geoID
    }));
    const shouldUseDefaultDepartureID = defaultDepartureID && (0, _ramda.any)((0, _ramda.propEq)(defaultDepartureID, 'id'), departureCities);
    return shouldUseDefaultDepartureID ? {
      departureID: defaultDepartureID,
      transport: (0, _ramda.call)((0, _ramda.pipe)((0, _ramda.find)((0, _ramda.propEq)(defaultDepartureID, 'id')), (0, _ramda.prop)('transports'), _ramda.head), departureCities)
    } : null;
  }();
}