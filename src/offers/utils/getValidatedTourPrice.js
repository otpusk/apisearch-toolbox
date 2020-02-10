const getPriceChange = (selectedCode, validatedFlights) => {
    const selectedCodeWithoutIndex = selectedCode && selectedCode.split(/_/).slice(0, -1).join('_');
    const { priceChange = 0 } = validatedFlights[selectedCodeWithoutIndex] || {};

    return Number(priceChange);
};

const getSelectedFlightsPriceChange = (state, offerId, { selectedFlights, flights }) => {
    const validatedFlights = flights || state.getIn(['validatedTour', offerId, 'flights'], {});
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
    const selectedInbound = selected.inbound;
    const selectedOutbound = selected.outbound;

    return getPriceChange(selectedInbound, validatedFlights) + getPriceChange(selectedOutbound, validatedFlights);
};

const getValidatedTourPrice = (state, offerId, currency) => {
    const offerPrice =  state.getIn(['store', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const actualPrice =  state.getIn(['siblings', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const validatedPrice = state.getIn(['validatedTour', offerId, 'price', ...currency ? [currency] : []], currency ? 0 : {});
    const price = validatedPrice || actualPrice || offerPrice;

    return price;
};

const getValidatedTourNewPrice = (state, offerId, selectedFlights) => {
    const currency =  state.getIn(['store', offerId, 'currency'], 'usd');
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
    const newPrice = getValidatedTourPrice(state, offerId, currency) + getSelectedFlightsPriceChange(state, offerId, { selectedFlights: selected });

    return newPrice;
};

export {
    getPriceChange,
    getSelectedFlightsPriceChange,
    getValidatedTourPrice,
    getValidatedTourNewPrice
};
