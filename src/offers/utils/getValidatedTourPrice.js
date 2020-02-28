const getPriceChange = (selectedCode, validatedFlights) => {
    const selectedCodeWithoutIndex = selectedCode && selectedCode.split(/_/).slice(0, -1).join('_');
    const { priceChange = { usd: 0, eur: 0, uah: 0 }} = validatedFlights[selectedCodeWithoutIndex] || {};

    return priceChange;
};

const getSelectedFlightsPriceChange = (state, offerId, { selectedFlights, flights }, currency = 'usd') => {
    const validatedFlights = flights || state.getIn(['validatedTour', offerId, 'flights'], {});
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
    const selectedInbound = selected.inbound;
    const selectedOutbound = selected.outbound;

    return getPriceChange(selectedInbound, validatedFlights)[currency] + getPriceChange(selectedOutbound, validatedFlights)[currency];
};

const getValidatedTourPrice = (state, offerId, currency) => {
    const offerPrice =  state.getIn(['store', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const actualPrice =  state.getIn(['siblings', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const validatedPrice = state.getIn(['validatedTour', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const price = validatedPrice || actualPrice || offerPrice;

    return price;
};

const getValidatedTourNewPrice = (state, offerId, selectedFlights, currency = 'usd') => {
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
    const newPrice = getValidatedTourPrice(state, offerId, currency) + getSelectedFlightsPriceChange(state, offerId, { selectedFlights: selected }, currency);

    return newPrice;
};

export {
    getPriceChange,
    getSelectedFlightsPriceChange,
    getValidatedTourPrice,
    getValidatedTourNewPrice
};
