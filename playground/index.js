import { store } from './store';

import { compileQueryToHash, createQuery, parseHashToQuery } from '../src/queries/fn';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const q = createQuery();

console.log(q);
console.log(compileQueryToHash(q));
console.log(parseHashToQuery(`#${compileQueryToHash(q)}`));

sleep(1);
