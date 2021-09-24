import * as R from 'ramda';

const createMemory = () => {
    const memory = {
        stableHotels: [],
        hotelsHub:    {},
        offersHub:    {},
        usedPrices:   [],
        unusedPrices: [],
        total:        0,
    };

    return {
        addStableHotels: (next) => {
            memory.stableHotels = R.concat(memory.stableHotels, next);
        },
        addHotels: (next) => {
            memory.hotelsHub = R.mergeAll([memory.hotelsHub, next]);
        },
        addOffers: (next) => {
            memory.offersHub = R.mergeAll([memory.offersHub, next]);
        },
        setUsedPrices: (next) => {
            memory.usedPrices = next;
        },
        clearUsedPrices: () => {
            memory.usedPrices = [];
        },
        setUnusedPrices: (next) => {
            memory.unusedPrices = next;
        },
        incTotal: (nextTotal) => {
            memory.total += nextTotal;
        },
        getValues: R.always(memory),
    };
};

export default createMemory;
