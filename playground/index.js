import { store } from './store';
import { ExcursionQuery } from '../src/excursionSearch';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

const q = new ExcursionQuery()
    .setPrice({from: 1233, to: 12313})
    .setDeparture(1544)
    .setSortsOrder({price: 'asc', 'length': 'desc'})
    .setOperators([1, 2 , 3]);

const com = q.compileQuery();
console.log(com);
console.log(q.parseQueryString('#' + com));
// console.log(q);


sleep(1);
