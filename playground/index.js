import { store } from './store';

import { searchActions } from "../src/search";
import { geoActions } from "../src/geo";

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

// store.dispatch(searchActions.getAvailableDates({ regionId: 1544 }));
store.dispatch(geoActions.getLocationData(115));
sleep(1);
