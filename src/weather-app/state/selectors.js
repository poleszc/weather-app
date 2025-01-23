import { createSelector } from "@reduxjs/toolkit";
import { LOCATION_REDUCER_NAME } from "./locationReducers";
import { CITIES_REDUCER_NAME } from "./cityDataReducers";
import { THEME_REDUCER_NAME } from "./themeReducers";

export const selectLocationState = (state) => state[LOCATION_REDUCER_NAME];
export const cityDataState = (state) => state[CITIES_REDUCER_NAME];
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
    cityDataState,
    ({ cities }) => cities
);

export const filteredCitiesSelector = createSelector(
    cityDataState,
    ({ filteredCities }) => filteredCities  
);

export const citiesAreLoadingSelector = createSelector(
    cityDataState,
    ({ loading }) => loading 
);

export const filterSelector = createSelector(
    cityDataState,
    ({ filter }) => filter
);

export const weatherByCitySelector = createSelector(
    cityDataState,
    ({ weatherByCity }) => weatherByCity  
);

export const maxPopulationInVisibleCitiesSelector = createSelector(
    cityDataState,
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

export const minPopulationInVisibleCitiesSelector = createSelector(
    cityDataState,
    ( {cities} ) => {
        if (!cities || cities.length === 0) {
            return null;
        }
        const cityWithMaxPopulation = cities.reduce((maxCity, currentCity) => {
            return parseInt(currentCity.population, 10) < parseInt(maxCity.population, 10) ? currentCity : maxCity;
        });
        return cityWithMaxPopulation.population;
    }
);