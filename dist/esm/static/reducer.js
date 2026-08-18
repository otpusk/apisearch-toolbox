import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import { clearStaticData, setStaticData } from './actions';
const initialState = {
  photoCategories: []
};
export default handleActions({
  [setStaticData]: (_, _ref) => {
    let {
      payload: nextStaticData
    } = _ref;
    return nextStaticData;
  },
  [clearStaticData]: () => R.clone(initialState)
}, initialState);