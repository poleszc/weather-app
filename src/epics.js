import { combineEpics } from 'redux-observable';

import { locateUserEpic } from './weather-app/state/locationEpics.js';
import { getCitiesEpic, filterCitiesEpic, getWeatherEpic, refreshWeatherEpic } from './weather-app/state/cityDataEpics.js';

export const rootEpic = combineEpics(
    locateUserEpic,
    getCitiesEpic,
    filterCitiesEpic,
    getWeatherEpic,
    refreshWeatherEpic
);
