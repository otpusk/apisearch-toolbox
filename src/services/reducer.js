// Core
import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { servicesActions } from './actions';

const initialState = Map({
    labels: Map({
        'beach_line': 'Линия пляжа',
        'location':   'Расположение',
        'beach':      'Пляж',
        'main':       'Главное',
        'beach_type': 'тип пляжа',
        'child':      'Для детей',
        'hotel':      'Услуги в отеле',
        'room':       'Удобства в номерах',
        'sport':      'Развлечения и спорт',
        'recommend':  'Отели с рекомендацией',
    }),
    groups:    Map(),
    countries: Map(),
});

export const servicesReducer = handleActions(
    {
        [servicesActions.getServicesSuccess]: (state, { payload: { countryId, services: raw }}) => {
            const servicesWithLabels = fromJS(raw);
            const services = servicesWithLabels.map((group) => group.map((label, code) => code).toList());
            const labels = servicesWithLabels.reduce((list, group) => list.merge(group), Map());

            return state
                .setIn(['groups'], services)
                .setIn(['countries', countryId], services)
                .mergeIn(['labels'], labels);
        },
        [servicesActions.setLabels]: (state, { payload: labels }) => state.set(labels, labels),
    },
    initialState
);
