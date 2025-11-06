const domain = (_) => _.auth;

export const getLang = (state) => {
    return domain(state).getIn(['otpusk', 'lang'], 'ru');
};

export const getLansAsQuery = (state) => {
    return { lang: getLang(state) };
};

export const getToken = (state) => {
    return domain(state).getIn(['otpusk', 'token']);
};
