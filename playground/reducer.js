import { combineReducers } from 'redux';

import { excursionGeoReducer as excursionGeo } from '../src/excursionGeo';
import { excursionReducer as excursion } from '../src/excursion';
import { servicesReducer as services } from '../src/services';

export const reducer = combineReducers({
    excursionGeo,
    excursion,
    services,
});
