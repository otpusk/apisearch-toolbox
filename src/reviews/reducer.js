import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import { setTurpravdaReviews, setTurpravdaWidget } from './actions';

const initialState = {
    turpravdaWidget:  {},
    turpravdaReviews: {},
};

export default handleActions({
    [setTurpravdaWidget]: (state, { payload }) => R.set(
        R.lensPath(['turpravdaWidget', payload.hotelID]),
        payload.widget,
        state
    ),
    [setTurpravdaReviews]: (state, { payload }) => R.set(
        R.lensPath(['turpravdaReviews', payload.hotelID]),
        payload.reviews,
        state
    ),
}, initialState);
