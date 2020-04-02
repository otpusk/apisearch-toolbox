// Core
import { debounce, takeEvery } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../actions';
import { getSuggestsWorker } from './workers/getSuggestsWorker';
import { getCountriesWorker } from './workers/getCountriesWorker';
import { getCitiesWorker } from './workers/getCitiesWorker';
import { getHotelsWorker } from './workers/getHotelsWorker';
import { getDepartureCitiesWorker } from './workers/getDepartureCitiesWorker';
import { getOperatorsWorker } from './workers/getOperatorsWorker';
import { getGeoTreeWorker } from './workers/getGeoTreeWorker';

export const geoWatchers =  Object.freeze({
    * getSuggestsWatcher () {
        yield debounce(250, geoActions.getSuggests, getSuggestsWorker);
    },
    * getCountriesWatcher () {
        yield takeEvery(geoActions.getCountries, getCountriesWorker);
    },
    * getCitiesWatcher () {
        yield takeEvery(geoActions.getCities, getCitiesWorker);
    },
    * getHotelsWatcher () {
        yield takeEvery(geoActions.getHotels, getHotelsWorker);
    },
    * getDepartureCitiesWatcher () {
        yield takeEvery(geoActions.getDepartureCities, getDepartureCitiesWorker);
    },
    * getOperatorsWatcher () {
        yield takeEvery(geoActions.getOperators, getOperatorsWorker);
    },
    * getGeoTreeWatcher () {
        yield takeEvery(geoActions.getGeoTree, getGeoTreeWorker);
    },
});
