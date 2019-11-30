import { store } from './store';
import { ExcursionQuery } from '../src/excursionSearch';
import { compileQuery } from '../src/excursionSearch/fn';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const q = new ExcursionQuery().setPrice({from: 1233, to: 12313}).setDeparture(1544).setSortsOrder({price: 'asc', 'length': 'desc'});

console.log(compileQuery(q));

sleep(1);
