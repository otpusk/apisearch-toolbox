// Core
import { takeLatest, takeEvery } from 'redux-saga/effects';

// Instruments
import { geoActions } from '/geo/actions';
import { getSuggestsWorker } from './workers/getSuggestsWorker';
import { getCountriesWorker } from './workers/getCountriesWorker';
import { getCitiesWorker } from './workers/getCitiesWorker';
import { getHotelsWorker } from './workers/getHotelsWorker';
import { getDepartureCitiesWorker } from './workers/getDepartureCitiesWorker';
import { getOperatorsWorker } from './workers/getOperatorsWorker';

export const geoWatchers =  Object.freeze({
    * getSuggestsWatcher () {
        yield takeLatest(geoActions.getSuggests, getSuggestsWorker);
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
});
