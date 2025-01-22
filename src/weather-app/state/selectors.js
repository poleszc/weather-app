import { createSelector } from "@reduxjs/toolkit";
import { LOCATION_REDUCER_NAME } from "./locationReducers";
import { CITIES_REDUCER_NAME } from "./citiesReducers";

export const selectLocationState = (state) => state[LOCATION_REDUCER_NAME];
export const citiesState = (state) => state[CITIES_REDUCER_NAME];


export const userLocationSelector = createSelector(
    selectLocationState,
    ({ position }) => position
);

export const citiesSelector = createSelector(
    citiesState,
    ({ cities }) => cities
);

export const filteredCitiesSelector = createSelector(
    citiesState,
    ({ filteredCities }) => filteredCities  
);

export const citiesAreLoadingSelector = createSelector(
    citiesState,
    ({ loading }) => loading 
);

export const filterSelector = createSelector(
    citiesState,
    ({ filter }) => filter
);