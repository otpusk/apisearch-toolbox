import { always, ifElse, split } from 'ramda';
export const generateOfferKey = function (id) {
  let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return `${id}-${JSON.stringify(meta)}`;
};
export const isOfferKey = offerID => typeof offerID === 'string';
export const extractDataFromOfferKey = key => {
  const [id, meta] = split('-', key);
  return {
    id,
    meta: meta ? JSON.parse(meta) : null,
    key
  };
};
export const presetEmpyShapeForActualizedOffer = ifElse(Boolean, prevShape => prevShape, always({}));