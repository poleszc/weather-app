import { createSelector } from "@reduxjs/toolkit";

export const selectLocationState = (state) => state['location'] // TODO: Change that to constants?


export const userLocationSelector = createSelector(
    selectLocationState,
    ({ position }) => position
);