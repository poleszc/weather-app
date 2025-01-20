import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyle } from './global-styles.jsx';
import { WeatherApp } from './weather-app';

export const App = () => {
    const dark = false;


    return (
        <ThemeProvider theme={dark === true ? darkTheme : lightTheme}>
            <GlobalStyle />
            <WeatherApp />
        </ThemeProvider>
    );
}
