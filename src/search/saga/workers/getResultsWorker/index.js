import { call, cancelled, delay, put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import { getToursNextSearch } from '@otpusk/json-api';

import { getQuery } from '../../../../queries/selectors';
import { convertToOtpQuery, QUERY_PARAMS } from '../../../../queries/fn';
import { searchActions } from '../../../../search/actions';
import { hotelsActions } from '../../../../hotels/actions';
import { hotelsHub as getHotelsHub } from '../../../../hotels/selectors';
import { offersActions } from '../../../../offers/actions';

import createMemory, { memoryInstances } from './resultsMemory';
import {
    addIgnoreOperators,
    getIgnoreOperators,
    getHotelsIDsFromPrices,
    generateNextPrices,
    getHotelsEntitiesMap,
    getOffersEntitiesMap,
    getUnusedPrices
} from './helpers';
import { GUARANTEED_RESULT_STEP } from './constants';

export function* getResultsWorker ({ payload: queryID }) {
    const query = yield select((state) => getQuery(state, { queryID }));
    const lang = yield select((state) => state.auth.getIn(['otpusk', 'lang'], null));
    const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
    const otpsukQuery = convertToOtpQuery(query.set(QUERY_PARAMS.LANGUAGE, lang));

    yield put(searchActions.startSearch(queryID));

    otpsukQuery.number = 0;
    otpsukQuery.data = 'extlinks';

    const activePage = query.get(QUERY_PARAMS.PAGE);

    activePage === 1 && delete memoryInstances[queryID];

    const memory = memoryInstances[queryID] = memoryInstances[queryID] || createMemory();

    try {
        do {
            const {
                lastResult: finished,
                hotels,
                offers,
                country,
                progress: operators,
                total,
                meta,
                prices,
            } = yield call(getToursNextSearch, token, otpsukQuery);

            !R.isEmpty(hotels) && memory.addHotels(hotels);
            !R.isEmpty(offers) && memory.addOffers(offers);

            memory.incTotal(total);

            {
                const { hotelsHub, offersHub, usedPrices, unusedPrices, stableHotels } = memory.getValues();

                const pricesWithoutStable = R.filter(
                    ({ hotelID }) => !R.includes(hotelID, stableHotels),
                    prices
                );
                const nextPrices = generateNextPrices(
                    [
                        ...pricesWithoutStable,
                        ...unusedPrices,
                        ...usedPrices
                    ],
                    offersHub
                );

                const hotelsFromStore = yield select(getHotelsHub);
                const hotelsToStore = getHotelsEntitiesMap(nextPrices, hotelsHub, hotelsFromStore);
                const offersToStore = getOffersEntitiesMap(nextPrices, offersHub);

                !R.isEmpty(hotelsToStore) && (yield put(hotelsActions.addHotels(hotelsToStore)));
                !R.isEmpty(offersToStore) && (yield put(offersActions.addOffers(offersToStore)));

                memory.setUsedPrices(nextPrices);
                memory.setUnusedPrices(getUnusedPrices(nextPrices, [...pricesWithoutStable, ...unusedPrices]));
            }

            const { usedPrices, total: totalValue } = memory.getValues();

            yield put(searchActions.processSearch(queryID, {
                page:   activePage,
                operators,
                country,
                total:  totalValue,
                meta,
                prices: R.clone(usedPrices),
            }));

            if (finished) {
                break;
            }
            yield delay(5000);

            const ignoreOperators = getIgnoreOperators(operators);

            !R.isEmpty(ignoreOperators) && addIgnoreOperators(
                otpsukQuery,
                ignoreOperators
            );

            otpsukQuery.number += 1;

        } while (otpsukQuery.number <= GUARANTEED_RESULT_STEP);

        const { total } = memory.getValues();

        yield put(searchActions.finishSearch(queryID, { total }));
    } catch (error) {
        yield put(searchActions.failSearch(
            queryID,
            error,
            {
                message:    error.message,
                statusCode: parseInt(error.message, 10),
            }
        ));
        console.log(error);
    } finally {
        if (yield cancelled()) {
            yield put(searchActions.resetSearch(queryID));
        }

        const { usedPrices } = memory.getValues();

        memory.addStableHotels(getHotelsIDsFromPrices(usedPrices));
        memory.clearUsedPrices();
    }
}
