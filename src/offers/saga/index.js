import { takeEvery } from 'redux-saga/effects';

import { offersActions } from '../actions';
import { bootstrapOfferSaga } from './getOfferSaga';
import { actualizeOfferSaga } from './actualizeOfferSaga';

function* offersRootSaga () {
    yield takeEvery(offersActions.getOffer, bootstrapOfferSaga);
    yield takeEvery(offersActions.actualizeOffer, actualizeOfferSaga);
}

export { offersRootSaga };
