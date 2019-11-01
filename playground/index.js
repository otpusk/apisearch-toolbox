import { store } from './store';
import { ExcursionQuery, excursionSearchActions } from '../src/excursionSearch';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const query = new ExcursionQuery().setDuration({from: 1, to: 2});

store.dispatch(excursionSearchActions.createQuery('main', query));
store.dispatch(excursionSearchActions.getSearchCount('main'));

sleep(1);
