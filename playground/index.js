import { store } from './store';
import { excursionToursActions } from '../src/excursionTours';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

store.dispatch(excursionToursActions.getTour(68831));

sleep(1);
