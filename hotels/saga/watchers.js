// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { hotelsActions as actions } from '/hotels/actions';
import { getHotelWorker, getHotelsMarkersWorker, getSimilarHotelsWorker } from './workers';

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
});
