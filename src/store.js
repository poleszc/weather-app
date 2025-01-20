import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import locationReducer from './weather-app/state/locationSlice.js';

import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        location: locationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);
