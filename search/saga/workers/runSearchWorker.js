// Core
import { call, put, select, fork } from 'redux-saga/effects';
import { Map, fromJS } from 'immutable';
import { delay } from 'redux-saga/effects';

// Instruments
import { convertToOtpQuery, QUERY_PARAMS } from 'helpers/query';
import { searchActions } from 'bus/search/actions';
import { hotelsActions } from 'bus/hotels/actions';
import { offersActions } from 'bus/offers/actions';
import { getToursSearch } from '@otpusk/json-api';

function* runSearchKiller () {
    yield delay(35000);
}

export function* runSearchWorker ({ payload: queryId }) {
    try {
        const { query, otpuskQuery, singleHotelQuery } = yield select((state) => ({
            query:            state.queries.get(queryId),
            otpuskQuery:      convertToOtpQuery(state.queries.get(queryId)),
            singleHotelQuery: state.queries.get(queryId).get(QUERY_PARAMS.HOTELS).length === 1,
        }));
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const killer = yield fork(runSearchKiller);

        yield put(searchActions.startSearch(queryId));
        otpuskQuery.number = 0;
        do {
            const {
                lastResult: finished,
                result,
                country,
                progress: operators,
                total,
            } = yield call(getToursSearch, token, otpuskQuery);

            const hotels = Map(result.hotels)
                .filter(({ name }) => Boolean(name) || query.get(QUERY_PARAMS.SHORT))
                .map((hotel) => fromJS(hotel)
                    .updateIn(['offers'], (offers) =>
                        offers
                            .map((offerId) => result.offers[offerId])
                            .sortBy(({ price: { uah }}) => uah)
                            .take(singleHotelQuery ? offers.count() : 5)
                    )
                ).sortBy((hotel) =>
                    hotel.get('offers').first().price.uah
                ).map((hotel) =>
                    hotel
                        .updateIn(['offers'], (offers) => offers.map(({ id }) => id))
                        .toJS()
                );

            const offers = Map(result.offers).filter(({ id }) => hotels.some(({ offers: hotelOffers }) => hotelOffers.includes(id)));

            if (hotels && offers) {
                yield put(hotelsActions.addHotels(hotels));
                yield put(offersActions.addOffers(offers));
            }

            yield put(searchActions.processSearch(queryId, {
                operators,
                hotels: hotels.map(({ offers: hotelOffers }) => hotelOffers),
                country,
                total,
                page:   otpuskQuery.page,
            }));

            if (finished) {
                break;
            }
            yield delay(5000);

            otpuskQuery.number+=1;
        } while (killer.isRunning());

        yield delay(200);
        yield put(searchActions.finishSearch(queryId));
    } catch (error) {
        console.error(error);
        yield put(searchActions.failSearch(queryId));
    }
}
