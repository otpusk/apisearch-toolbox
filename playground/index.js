import { store } from './store';
import { actions } from '../src/excursionAds/actions';
import { getAgencies } from '@otpusk/excursion-api';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const query = {
    cruiseId:   68635,
    date:       '2020-03-09',
    operatorId: 464,
    variantId:  20653084,
    cityFrom:   1,
    deptCity:   1397,
};

store.dispatch(actions.getOffices(query));

sleep(1);
