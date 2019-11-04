import { store } from './store';
import { ExcursionQuery, excursionSearchActions } from '../src/excursionSearch';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const query = new ExcursionQuery();

store.dispatch(excursionSearchActions.createQuery('main', query));
store.dispatch(excursionSearchActions.getExcursionsCount('main'));

sleep(1);
