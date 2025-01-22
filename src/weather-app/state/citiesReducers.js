import { createSlice } from "@reduxjs/toolkit";
import { bounds } from "leaflet";


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
            console.log("getCitiesStart");
            state.loading = true;
            state.error = null;
        },
        getCitiesSuccess: (state, action) => {
            console.log("getCitiesSuccess");
            state.loading = false;
            state.cities = action.payload;
            state.filteredCities = action.payload;
            // TODO: Clear filters on map move?
        },
        getCitiesFailure: (state, action) => {
            console.log("getCitiesFail");
            state.loading = false;
            state.error = action.payload;
        },
        getWeatherStart: (state) => {
            console.log("Get weather start");
        },
        getWeatherSuccess: (state, action) => {
            console.log("Get weather success");
            const {cityName, weatherData} = action.payload;
            state.weatherByCity[cityName] = weatherData;
        },
        getWeatherFailure: (state, action) => {
            console.log("Get weather failure");
        },
        clearWeatherData: (state) => {
            state.weatherByCity = {};
        },
        updateBounds: (state, action) => {
            console.log("New bounds: " + action.payload);
            state.bounds = action.payload;
        },
        applyFilters: (state, action) => {
            console.log("Update filters");
            state.filter = action.payload;
        },
        updateFilteredCities: (state, action) => {
            console.log("Update filtered cities");
            state.filteredCities = action.payload;
        }
    }
});

export const { 
    getCitiesStart,
    getCitiesSuccess, 
    getCitiesFailure, 
    getWeatherStart,
    getWeatherSuccess,
    getWeatherFailure,
    updateBounds, 
    applyFilters,
    updateFilteredCities,
    clearWeatherData
} = citiesSlice.actions;

export default citiesSlice.reducer;