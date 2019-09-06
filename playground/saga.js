import { all } from 'redux-saga/effects';

import { excursionGeoWatchers } from '../src/excursionGeo';
import { excursionWatchers } from '../src/excursion';
import { servicesWatchers } from '../src/services';

export function* saga () {
    const tasks = [excursionGeoWatchers, excursionWatchers, servicesWatchers]
        .map((watchers) => Object.values(watchers).map((watcher) => watcher()))
        .reduce((watchers, group) => [...watchers, ...group], []);

    yield all(tasks);
}
