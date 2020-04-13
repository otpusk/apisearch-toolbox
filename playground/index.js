import { store } from './store';

import { searchActions } from "../src/search";

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

store.dispatch(searchActions.getAvailableDates({ regionId: 1544 }));

sleep(1);
