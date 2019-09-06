import { store } from './store';
import { servicesActions } from '../src/services';

store.dispatch(servicesActions.getServices(0));
store.dispatch(servicesActions.getServices(43));

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

sleep(1);
