// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { offersActions as actions } from '../../offers/actions';
import { getOfferWorker, checkOfferStatusWorker, validateOfferAdditionalCostsWorker } from './workers';

export const offersWatchers = Object.freeze({
    * getOfferWatcher () {
        yield takeEvery(actions.getOffer, getOfferWorker);
    },
    * checkOfferStatusWatcher () {
        yield takeEvery(actions.checkOfferStatus, checkOfferStatusWorker);
    },
    * validateOfferAdditionalCostsWatcher () {
        yield takeEvery(actions.validateOfferAdditionalCosts, validateOfferAdditionalCostsWorker);
    },
});
