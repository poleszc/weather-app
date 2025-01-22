import { combineEpics } from 'redux-observable';

import { locateUserEpic } from './weather-app/state/locationEpic.js';
import { getCitiesEpic, filterCitiesEpic } from './weather-app/state/citiesEpic.js';

export const rootEpic = combineEpics(
    locateUserEpic,
    getCitiesEpic,
    filterCitiesEpic
);
