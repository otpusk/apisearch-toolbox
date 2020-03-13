const mergeObjectDeepWithoutArrays = (prev, next) => {
    const isObject = next && typeof next === 'object';
    const notIterable = isObject && !next[Symbol.iterator];

    if (notIterable) {
        return Object.entries(next).reduce(
            (result, [key, nextValue]) => Object.assign(result, { [key]: mergeObjectDeepWithoutArrays(result[key], nextValue) }),
            Object.assign({}, prev)
        );
    }

    return next || prev;
};

const mergeOfferNextPriority = (prev, next) => next && typeof next === 'object' && !next[Symbol.iterator] && !(next instanceof Error)
    ? { ...prev, ...next }
    : next;

export {
    mergeObjectDeepWithoutArrays,
    mergeOfferNextPriority
};
