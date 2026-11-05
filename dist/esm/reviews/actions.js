import { createActions } from 'redux-actions';
export const {
  getTurpravdaWidget,
  getTurpravdaWidgetFail,
  setTurpravdaWidget,
  getTurpravdaReviews,
  getTurpravdaReviewsFail,
  setTurpravdaReviews
} = createActions({
  getTurpravdaWidget: hotelID => hotelID,
  getTurpravdaWidgetFail: error => error,
  setTurpravdaWidget: (hotelID, widget) => ({
    hotelID,
    widget
  }),
  getTurpravdaReviews: hotelID => hotelID,
  getTurpravdaReviewsFail: error => error,
  setTurpravdaReviews: (hotelID, reviews) => ({
    hotelID,
    reviews
  })
}, {
  prefix: 'API_TOOLBOX'
});