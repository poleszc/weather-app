import { combineEpics } from 'redux-observable';

import { locateUserEpic } from './weather-app/state/locationEpic.js';

export const rootEpic = combineEpics(
    locateUserEpic
);
