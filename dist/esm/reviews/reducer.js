import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import { setTurpravdaReviews, setTurpravdaWidget } from './actions';
const initialState = {
  turpravdaWidget: {},
  turpravdaReviews: {}
};
export default handleActions({
  [setTurpravdaWidget]: (state, _ref) => {
    let {
      payload
    } = _ref;
    return R.set(R.lensPath(['turpravdaWidget', payload.hotelID]), payload.widget, state);
  },
  [setTurpravdaReviews]: (state, _ref2) => {
    let {
      payload
    } = _ref2;
    return R.set(R.lensPath(['turpravdaReviews', payload.hotelID]), payload.reviews, state);
  }
}, initialState);