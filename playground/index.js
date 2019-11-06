import { store } from './store';
import { ExcursionQuery, excursionSearchActions } from '../src/excursionSearch';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const query = new ExcursionQuery().setSortsOrder({price: 'desc', length: 'asc'});

const anotherQuery = new ExcursionQuery().setSortsOrder(query.getSortsOrder());

console.log(anotherQuery.getSortsOrder());

store.dispatch(excursionSearchActions.createQuery('main', anotherQuery));
store.dispatch(excursionSearchActions.runSearch('main'));

sleep(1);
