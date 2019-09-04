import { store } from './store';
import { excursionGeoActions } from '../src/excursionGeo';

store.dispatch(excursionGeoActions.getDepartureCities(0));

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

sleep(1);
