import { combineReducers } from 'redux';

import { excursionGeoReducer as excursionGeo } from '../src/excursionGeo';
import { excursionReducer as excursion } from '../src/excursion';
import { excursionSearchReducer as excursionSearch } from '../src/excursionSearch';
import { excursionToursReducer as excursionTours } from '../src/excursionTours';
import { servicesReducer as services } from '../src/services';

export const reducer = combineReducers({
    excursionGeo,
    excursion,
    services,
    excursionSearch,
    excursionTours,
});
