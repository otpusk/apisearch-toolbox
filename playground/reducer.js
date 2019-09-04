import { combineReducers } from 'redux';

import { excursionGeoReducer } from '../src/excursionGeo';
import { excursionReducer } from '../src/excursion';

export const reducer = combineReducers({
    excursionGeoReducer,
    excursionReducer,
});
