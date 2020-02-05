import { store } from './store';
import { excursionSearchActions } from '../src/excursionSearch';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

store.dispatch(excursionSearchActions.getSearchPrices());

sleep(1);
