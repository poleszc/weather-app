import { createSelector } from "@reduxjs/toolkit";
import { LOCATION_REDUCER_NAME } from "./locationReducers";
import { CITIES_REDUCER_NAME } from "./citiesReducers";
import { THEME_REDUCER_NAME } from "./themeReducers";

export const selectLocationState = (state) => state[LOCATION_REDUCER_NAME];
export const citiesState = (state) => state[CITIES_REDUCER_NAME];
export const themeState = (state) => state[THEME_REDUCER_NAME];


export const userLocationSelector = createSelector(
    selectLocationState,
    ({ position }) => position
);

export const themeSelector = createSelector(
    themeState,
    ({ isDarkMode }) => isDarkMode
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

export const weatherByCitySelector = createSelector(
    citiesState,
    ({ weatherByCity }) => weatherByCity  
);

export const maxPopulationInVisibleCitiesSelector = createSelector(
    citiesState,
    ( {cities} ) => {
        if (!cities || cities.length === 0) {
            return null;
        }
        const cityWithMaxPopulation = cities.reduce((maxCity, currentCity) => {
            return parseInt(currentCity.population, 10) > parseInt(maxCity.population, 10) ? currentCity : maxCity;
        });
        return cityWithMaxPopulation.population;
    }
);