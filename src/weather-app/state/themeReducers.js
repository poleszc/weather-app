import { createSlice } from '@reduxjs/toolkit';

export const THEME_REDUCER_NAME = 'theme';

const initialState = {
    isDarkMode: false,
};

const themeSlice = createSlice({
    name: THEME_REDUCER_NAME,
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;