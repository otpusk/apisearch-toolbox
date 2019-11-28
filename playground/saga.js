import { all } from 'redux-saga/effects';

import { excursionGeoWatchers } from '../src/excursionGeo';
import { excursionWatchers } from '../src/excursion';
import { excursionSearchWatchers } from '../src/excursionSearch';
import { excursionToursWatchers } from '../src/excursionTours';
import { servicesWatchers } from '../src/services';

export function* saga () {
    const tasks = [excursionGeoWatchers, excursionWatchers, excursionToursWatchers, servicesWatchers, excursionSearchWatchers]
        .map((watchers) => Object.values(watchers).map((watcher) => watcher()))
        .reduce((watchers, group) => [...watchers, ...group], []);

    yield all(tasks);
}
