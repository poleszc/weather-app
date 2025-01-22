import { createSlice } from "@reduxjs/toolkit";
import { bounds } from "leaflet";


export const CITIES_REDUCER_NAME = 'cities'

const initialState = {
    cities: [],
    filteredCities: [],
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
    updateBounds, 
    applyFilters,
    updateFilteredCities 
} = citiesSlice.actions;

export default citiesSlice.reducer;