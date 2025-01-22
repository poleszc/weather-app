import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyle } from './global-styles.jsx';
import { WeatherApp } from './weather-app';
import { useState } from 'react';
import { isDraft } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { themeSelector } from './weather-app/state/selectors.js';

export const App = () => {
    const isDarkMode = useSelector(themeSelector);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <GlobalStyle />
            <WeatherApp />
        </ThemeProvider>
    );
}
