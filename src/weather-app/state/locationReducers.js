import { createSlice } from '@reduxjs/toolkit';

export const LOCATION_REDUCER_NAME = 'location';


const initialState = {
    position: {'lat': 0, 'lng': 0},
    loading: false,
    error: null,
};

export const locationSlice = createSlice({
    name: LOCATION_REDUCER_NAME,
    initialState,
    reducers: {
        locateUserStart: (state) => {
            // console.log("start");
            state.loading = true;
            state.error = null;
        },
        locateUserSuccess: (state, action) => {
            // console.log("success");
            // console.log(action.payload)
            state.position = action.payload;
            // console.log(state.position);
            state.loading = false;
        },
        locateUserFailure: (state, action) => {
            // console.log("fail");
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { locateUserStart, locateUserSuccess, locateUserFailure } = locationSlice.actions;

export default locationSlice.reducer;