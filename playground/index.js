import { store } from './store';
import { QueryOrderedMap } from '../src/excursionSearch';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const query = new QueryOrderedMap();

console.log(JSON.stringify(query.setDeparture(100).setLocations([1, 2, 3]).toJS()));

// store.dispatch(servicesActions.getServices(0));
// store.dispatch(servicesActions.getServices(43));
// sleep(1);
