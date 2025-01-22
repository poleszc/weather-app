import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import locationReducer from './weather-app/state/locationReducers.js';
import cityDataReducer from './weather-app/state/cityDataReducers.js';
import themeReducer from './weather-app/state/themeReducers.js';

import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        location: locationReducer,
        cities: cityDataReducer,
        theme: themeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);
