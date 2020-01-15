import { store } from './store';
import { excursionAdsActions } from '../src/excursionAds';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const query = {
    token:  '1b204-25f04-4b78c-0b089-e27ea',
    params: { cruiseId: 47658, date: '2019-12-20', variantId: 2025100319, cityFrom: 1815, deptCity: 1397 },
};

store.dispatch(excursionAdsActions.getOffices(query));

sleep(1);
