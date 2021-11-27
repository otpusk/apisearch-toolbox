import { createActions } from 'redux-actions';

export const { getTurpravdaWidget, setTurpravdaWidget } = createActions(
    {
        getTurpravdaWidget: (hotelID) => hotelID,
        setTurpravdaWidget: (hotelID, widget) => ({ hotelID, widget }),
    },
    { prefix: 'API_TOOLBOX' }
);
