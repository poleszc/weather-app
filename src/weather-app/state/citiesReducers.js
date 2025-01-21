import { createSlice } from "@reduxjs/toolkit";


export const CITIES_REDUCER_NAME = 'cities'

const initialState = {
    cities: [],
    loading: false,
    error: null
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
        },
        getCitiesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { getCitiesStart, getCitiesSuccess, getCitiesFailure } = citiesSlice.actions;

export default citiesSlice.reducer;