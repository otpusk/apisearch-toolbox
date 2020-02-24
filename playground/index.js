import { store } from './store';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

sleep(1);
