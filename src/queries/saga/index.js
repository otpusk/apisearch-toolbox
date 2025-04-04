import { put, race, select, take } from 'redux-saga/effects';
import { any, call, find, head, isEmpty, pipe, prop, propEq } from 'ramda';

import { geoActions } from '../../geo/actions';
import { getDepartures } from '../../geo/selectors';
export function* getDefaultDepartureDirection ({ defaultDepartureID, geoID }) {
    const shouldFetchDepartureCities =
        yield select((state) => isEmpty(getDepartures()(state, { geoID })));

    if (shouldFetchDepartureCities) {
        yield put(geoActions.getDepartureCities(geoID, '2.6'));
        yield race([
            take(geoActions.getDepartureCitiesSuccess),
            take(geoActions.getDepartureCitiesFail)
        ]);
    }

    const departureCities = yield select((state) => getDepartures()(state, { geoID }));
    const shouldUseDefaultDepartureID = defaultDepartureID && any(
        propEq(defaultDepartureID, 'id'),
        departureCities
    );

    return shouldUseDefaultDepartureID
        ? {
            departureID: defaultDepartureID,
            transport:   call(
                pipe(
                    find(propEq(defaultDepartureID, 'id')),
                    prop('transports'),
                    head
                ),
                departureCities
            ),
        }
        : null;
}
