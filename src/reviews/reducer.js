import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import { setTurpravdaWidget } from './actions';

const initialState = {
    turpravdaWidget: {},
};

export default handleActions({
    [setTurpravdaWidget]: (state, { payload }) => R.set(
        R.lensPath(['turpravdaWidget', payload.hotelID]),
        payload.widget,
        state
    ),
}, initialState);
