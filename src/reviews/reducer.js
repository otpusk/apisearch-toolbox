import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import { setTurpravdaWidget } from './actions';

const initialState = {
    turpravdaReviews: {},
};

export default handleActions({
    [setTurpravdaWidget]: (state, { payload }) => R.set(
        R.lensPath(['turpravdaReviews', payload.hotelID]),
        payload.widget,
        state
    ),
}, initialState);
