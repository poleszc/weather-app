import { createSlice } from "@reduxjs/toolkit";

export const CITIES_REDUCER_NAME = 'cities'

const initialState = {
    cities: [],
    filteredCities: [],
    weatherByCity: {},
    bounds: null,
    loading: false,
    error: null,
    filter: {
        city: '',
        population: 0
    }
}

export const citiesSlice = createSlice({
    name: CITIES_REDUCER_NAME,
    initialState,
    reducers: {
        getCitiesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getCitiesSuccess: (state, action) => {
            state.loading = false;
            state.cities = action.payload;
            state.filteredCities = action.payload;
        },
        getCitiesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getWeatherSuccess: (state, action) => {
            const {cityName, weatherData} = action.payload;
            state.weatherByCity[cityName] = weatherData;
        },
        getWeatherFailure: (state, action) => {
            state.error = action.payload;
        },
        clearWeatherData: (state) => {
            state.weatherByCity = {};
        },
        updateBounds: (state, action) => {
            state.bounds = action.payload;
        },
        applyFilters: (state, action) => {
            state.filter = action.payload;
        },
        updateFilteredCities: (state, action) => {
            state.filteredCities = action.payload;
        }
    }
});

export const { 
    getCitiesStart,
    getCitiesSuccess, 
    getCitiesFailure, 
    getWeatherSuccess,
    getWeatherFailure,
    updateBounds, 
    applyFilters,
    updateFilteredCities,
    clearWeatherData
} = citiesSlice.actions;

export default citiesSlice.reducer;