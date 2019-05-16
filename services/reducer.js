// Core
import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { servicesActions } from './actions';

const initialState = Map({
    labels: Map({
        'beach_line': 'Линия пляжа',
        'beach':      'Пляж',
        'main':       'Главное',
        'beach_type': 'тип пляжа',
        'child':      'Для детей',
        'hotel':      'Услуги в отеле',
        'room':       'Удобства в номерах',
        'sport':      'Развлечения и спорт',
        'recommend':  'Отели с рекомендацией',
    }),
    groups: Map(),
});

export const servicesReducer = handleActions(
    {
        [servicesActions.getServicesSuccess]: (state, { payload }) => {
            const services = fromJS(payload);

            return state
                .setIn(['groups'], services.map(
                    (group) => group.map((label, code) => code).toList()
                ))
                .mergeIn(['labels'], services.reduce(
                    (list, group) => list.merge(group),
                    Map()
                ));
        },
    },
    initialState
);
