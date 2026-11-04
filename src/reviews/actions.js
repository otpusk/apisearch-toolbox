import { createActions } from 'redux-actions';

export const {
    getTurpravdaWidget,
    getTurpravdaWidgetFail,
    setTurpravdaHotel,
    setTurpravdaWidget,
} = createActions(
    {
        getTurpravdaWidget:     (hotelID) => hotelID,
        getTurpravdaWidgetFail: (error) => error,
        setTurpravdaHotel:      (hotelID, hotel) => ({ hotelID, hotel }),
        setTurpravdaWidget:     (hotelID, widget) => ({ hotelID, widget }),
    },
    { prefix: 'API_TOOLBOX' }
);
