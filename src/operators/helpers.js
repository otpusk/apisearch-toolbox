export const createRateHash = (from, to) => [from, to].join('-');
export const parseRateHash = (hash) => {
    const [from = '', to = ''] = hash.split('-');

    return { from, to };
};
