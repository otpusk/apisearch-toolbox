const sumByKey = (obj1, obj2) => {
    const res = {};

    for (const [key, value] of Object.entries(obj1)) {
        if (obj2.hasOwnProperty(key)) {
            res[key] = Number(value) + Number(obj2[key]);
        }
    }

    return res;
};

const getPriceChange = (selectedCode, validatedFlights) => {
    const selectedCodeWithoutIndex = selectedCode && selectedCode.split(/_/).slice(0, -1).join('_');
    const { priceChange = { usd: 0, eur: 0, uah: 0 }} = validatedFlights && validatedFlights[selectedCodeWithoutIndex] || {};

    return priceChange;
};

const getSelectedFlightsPriceChange = (state, offerId, { selectedFlights, flights }) => {
    const validatedFlights = flights || state.getIn(['validatedTour', offerId, 'flights'], {});
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
    const selectedInbound = selected.inbound;
    const selectedOutbound = selected.outbound;

    return sumByKey(getPriceChange(selectedInbound, validatedFlights), getPriceChange(selectedOutbound, validatedFlights));
};

const getValidatedTourPrice = (state, offerId, currency) => {
    const offerPrice =  state.getIn(['store', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const actualPrice =  state.getIn(['siblings', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const validatedPrice = state.getIn(['validatedTour', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const price = validatedPrice || actualPrice || offerPrice;

    return price;
};

const getValidatedTourNewPrice = (state, offerId, selectedFlights) => {
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
    const newPrice = sumByKey(getValidatedTourPrice(state, offerId), getSelectedFlightsPriceChange(state, offerId, { selectedFlights: selected }));

    return newPrice;
};

export {
    getPriceChange,
    getSelectedFlightsPriceChange,
    getValidatedTourPrice,
    getValidatedTourNewPrice,
    sumByKey
};
