// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { hotelsActions as actions } from '../actions';
import { getHotelWorker, getHotelsMarkersWorker, getSimilarHotelsWorker, getDescriptionsByOperatorWorker } from './workers';

export const hotelsWatchers =  Object.freeze({
    * getHotelWatcher () {
        yield takeEvery(actions.getHotel, getHotelWorker);
    },
    * getHotelsMarkersWatcher () {
        yield takeEvery(actions.getHotelsMarkers, getHotelsMarkersWorker);
    },
    * getSimilarHotelsWatcher () {
        yield takeEvery(actions.getSimilarHotels, getSimilarHotelsWorker);
    },
    * getHotelDescriptors () {
        yield takeEvery(actions.getDescriptionsByOperator, getDescriptionsByOperatorWorker);
    },
});
