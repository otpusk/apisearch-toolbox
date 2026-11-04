import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import { setTurpravdaHotel, setTurpravdaWidget } from './actions';

const initialState = {
    turpravdaHotels:  {},
    turpravdaReviews: {},
};

export default handleActions({
    [setTurpravdaHotel]: (state, { payload }) => R.set(
        R.lensPath(['turpravdaHotels', payload.hotelID]),
        payload.hotel,
        state
    ),
    [setTurpravdaWidget]: (state, { payload }) => R.set(
        R.lensPath(['turpravdaReviews', payload.hotelID]),
        payload.widget,
        state
    ),
}, initialState);
