import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyle } from './global-styles.jsx';
import { WeatherApp } from './weather-app';
import { useState } from 'react';
import { isDraft } from '@reduxjs/toolkit';

export const App = () => {
    // const [isDark, setIsDark] = useState(false);

    // const changeTheme = () => { setIsDark(!isDark); }

    const dark = false;


    return (
        <ThemeProvider theme={dark === true ? darkTheme : lightTheme}>
            <GlobalStyle />
            <WeatherApp />
        </ThemeProvider>
    );
}
