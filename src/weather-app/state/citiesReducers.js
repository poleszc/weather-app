import { createSlice } from "@reduxjs/toolkit";
import { bounds } from "leaflet";


export const CITIES_REDUCER_NAME = 'cities'

const initialState = {
    cities: [],
    bounds: null,
    loading: false,
    error: null
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
        },
        getCitiesFailure: (state, action) => {
            console.log("getCitiesFail");
            state.loading = false;
            state.error = action.payload;
        },
        updateBounds: (state, action) => {
            console.log("New bounds: " + action.payload);
            state.bounds = action.payload;
        }
    }
});

export const { getCitiesStart, getCitiesSuccess, getCitiesFailure, updateBounds } = citiesSlice.actions;

export default citiesSlice.reducer;