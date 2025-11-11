import { select, put } from 'redux-saga/effects';
import * as R from "ramda";

import { getQuery } from "../../../queries/selectors";
import { hotelsHub as getHotelsHub } from "../../../hotels/selectors";
import { QUERY_PARAMS } from "../../../queries/fn";
import { hotelsActions } from "../../../hotels";
import { offersActions } from "../../../offers";

import { searchActions } from "../../actions";

import { memoryInstances } from "./getResultsWorker/resultsMemory";
import { generateNextPrices, getHotelsEntitiesMap, getOffersEntitiesMap } from "./getResultsWorker/helpers";


export function* silentSearch ({ payload : queryID }) {
    const query = yield select((state) => getQuery(state, { queryID }));

    const memory =  memoryInstances[queryID];

    const { hotelsHub, offersHub, unusedPrices, stablePrices } = memory.getValues();

    const nextPrices = generateNextPrices(
        [
            ...stablePrices,
            ...unusedPrices
        ],
        offersHub,
        query.get(QUERY_PARAMS.CURRENCY),
        query.get(QUERY_PARAMS.SELECTED_OPERATORS).toJS()
    );

    const hotelsFromStore = yield select(getHotelsHub);
    const hotelsToStore = getHotelsEntitiesMap(nextPrices, hotelsHub, hotelsFromStore);
    const offersToStore = getOffersEntitiesMap(nextPrices, offersHub);

    !R.isEmpty(hotelsToStore) && (yield put(hotelsActions.addHotels(hotelsToStore)));
    !R.isEmpty(offersToStore) && (yield put(offersActions.addOffers(offersToStore)));

    yield put(searchActions.processSearch(queryID, {
        page:   1,
        prices: nextPrices,
    }));
}
