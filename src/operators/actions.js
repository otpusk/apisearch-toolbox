import { createActions } from 'redux-actions';

export const operatorsActions = createActions({
    GET_OPERATORS:         (countryId, options) => ({ countryId, options }),
    GET_OPERATORS_SUCCESS: (countryId, operators) => ({ countryId, operators }),
    GET_OPERATORS_FAIL:    (error) => error,

    // rates
    GET_CURRENCY_RATES:         (dateFrom, dateTo, options) => ({ dateFrom, dateTo, options }),
    GET_CURRENCY_RATES_SUCCESS: (key, rates) => ({ key, rates }),
    GET_CURRENCY_RATES_FAIL:    (error) => error,

    SET_UI_FLAG: (path, value) => ({ path, value }),

    // hotel descriptors
    GET_HOTEL_DESCRIPTORS:         (operatorID, externalOperatorData) => ({ operatorID, externalOperatorData }),
    GET_HOTEL_DESCRIPTORS_SUCCESS: (operatorID, descriptors) => ({ operatorID, descriptors }),
    GET_HOTEL_DESCRIPTORS_FAIL:    (error) => error,
}, { prefix: 'API_TOOLBOX' });
