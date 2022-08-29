import { createSelector } from 'reselect';

const domain = (_) => _.auth;

export const getLang = createSelector(
    domain,
    (auth) => auth.getIn(['otpusk', 'lang'], 'rus')
);

export const getToken = createSelector(
    domain,
    (auth) => auth.getIn(['otpusk', 'token'])
);
