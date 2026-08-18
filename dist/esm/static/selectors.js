import { createSelector } from 'reselect';
import * as R from 'ramda';
const domain = _ => _.staticData;
export const isEmptyStaticData = createSelector(domain, R.pipe(R.toPairs, R.all(_ref => {
  let [, dataValue] = _ref;
  return R.isEmpty(dataValue);
})));
export const getPhotosCategories = createSelector(domain, R.prop('photoCategories'));
export const getPhotosCategoriesMap = createSelector(getPhotosCategories, categories => R.fromPairs(R.map(category => [category.id, category], categories)));