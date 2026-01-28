const domain = (_) => _.auth;

const getValue = (obj, path, defaultValue) => {
    if (!obj) {
        return defaultValue;
    }

    // immutable
    if (typeof obj.getIn === 'function') {
        return obj.getIn(path, defaultValue);
    }

    // plain object
    return path.reduce(
        (acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined,
        obj
    ) ?? defaultValue;
};

export const getLang = (state) => {
    return getValue(domain(state), ['otpusk', 'lang'], 'ru');
};

export const getLansAsQuery = (state) => {
    return { lang: getLang(state) };
};

export const getToken = (state) => {
    return getValue(domain(state), ['otpusk', 'token']);
};
