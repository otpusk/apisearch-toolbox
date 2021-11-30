import { createActions } from 'redux-actions';

export const { clearStaticData, getStaticData, setStaticData } = createActions(
    {
        clearStaticData: () => void 0,
        getStaticData:   () => void 0,
        setStaticData:   (data) => data,
    },
    { prefix: 'API_TOOLBOX' }
);
