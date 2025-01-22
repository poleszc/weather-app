import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import locationReducer from './weather-app/state/locationReducers.js';
import citiesReducer from './weather-app/state/citiesReducers.js';
import themeReducer from './weather-app/state/themeReducers.js';

import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        location: locationReducer,
        cities: citiesReducer,
        theme: themeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);
