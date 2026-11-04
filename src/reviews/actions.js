import { createActions } from 'redux-actions';

export const {
    getTurpravdaWidget,
    getTurpravdaWidgetFail,
    setTurpravdaWidget,
} = createActions(
    {
        getTurpravdaWidget:     (hotelID) => hotelID,
        getTurpravdaWidgetFail: (error) => error,
        setTurpravdaWidget:     (hotelID, widget) => ({ hotelID, widget }),
    },
    { prefix: 'API_TOOLBOX' }
);
