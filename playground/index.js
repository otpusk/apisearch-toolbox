import { store } from './store';
// import { ExcursionQuery } from '../src/excursionSearch';
import { excursionToursActions } from '../src/excursionTours';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

store.dispatch(excursionToursActions.getTourPage());
sleep(1);
