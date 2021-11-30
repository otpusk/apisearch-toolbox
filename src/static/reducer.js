import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import { clearStaticData, setStaticData } from './actions';

const initialState = {
    photoCategories: [],
};

export default handleActions({
    [setStaticData]:   (_, { payload: nextStaticData }) => nextStaticData,
    [clearStaticData]: () => R.clone(initialState),
}, initialState);
