import { createSelector } from "@reduxjs/toolkit";
import { LOCATION_REDUCER_NAME } from "./locationReducers";

export const selectLocationState = (state) => state[LOCATION_REDUCER_NAME];


export const userLocationSelector = createSelector(
    selectLocationState,
    ({ position }) => position
);