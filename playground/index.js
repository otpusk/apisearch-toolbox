import { store } from './store';
// import { ExcursionQuery } from '../src/excursionSearch';
import { excursionToursActions } from '../src/excursionTours';

const exec = require('child_process').execSync;
const sleep = (time) => time && exec(`sleep ${time}`);

store.dispatch(excursionToursActions.getTourPage());

// const q = new ExcursionQuery()
//     .setPrice({from: 1233, to: 12313})
//     .setDeparture(1544)
//     .setSortsOrder({price: 'asc', 'length': 'desc'})
//     .setOperators([1, 2 , 3]);

// const com = q.compileQuery();
// // console.log(com);
// const t = q.parseQueryString('#' + com);
// console.log(t);
// const nt = t.setDeparture(22222);
// console.log(nt);

// const query = {
//     token: '1b204-25f04-4b78c-0b089-e27ea',
//     params: { cruiseId: 47658, date: '2019-12-20', variantId: 2025100319, cityFrom: 1815, deptCity: 1397 },
// };

// store.dispatch(excursionToursActions.getAgencies(query));

sleep(1);
