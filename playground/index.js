import { store } from './store';
import { ExcursionQuery, excursionSearchActions } from '../src/excursionSearch';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const query = new ExcursionQuery().setDeparture(100).setLocations([1, 2, 3]);

store.dispatch(excursionSearchActions.createQuery('main', query));
store.dispatch(excursionSearchActions.runSearch('main'));
sleep(1);
