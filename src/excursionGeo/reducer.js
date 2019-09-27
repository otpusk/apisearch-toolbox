// Core
import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

const initialState = Map({
    suggests:   Map(),
    countries:  Map(),
    cities:     Map(),
    sights:     Map(),
    departures: Map(),
});

export const reducer = handleActions({
    [actions.getSuggestsSuccess]: (state, { payload: { key, suggestions }}) => {
        const { countries = [], cities = [], sights = []} = suggestions;
        const convertArrayToKeyedMap = (collection) => List(collection).toMap().mapKeys((k, { id }) => id);
        const extractKeys = (collection) => collection.map(({ id }) => id);

        return state
            .setIn(['suggests', key], {
                countries: extractKeys(countries),
                cities:    extractKeys(cities),
                sights:    extractKeys(sights),
            })
            .mergeIn(['countries'], convertArrayToKeyedMap(countries))
            .mergeIn(['cities'], convertArrayToKeyedMap(cities))
            .mergeIn(['sights'], convertArrayToKeyedMap(sights));
    },
    [actions.getDepartureCitiesSuccess]: (state, { payload: { countryId, cities }}) => {
        return state.setIn(['departures', countryId], cities);
    },
}, initialState);
