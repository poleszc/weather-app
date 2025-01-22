import { useDispatch, useSelector } from 'react-redux';

import { themeSelector } from '../../state/selectors.js';
import { changeTheme } from '../../state/themeReducers.js'
import { HeaderWrapper } from './HeaderWrapper.jsx';

export const Header = () => {
    const isDarkMode = useSelector(themeSelector);
    const dispatch = useDispatch();

    return (
        <HeaderWrapper>
            <div>
                <h1>Weather App</h1>
            </div>
            <div>
                <button onClick={() => { dispatch(changeTheme())}}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </HeaderWrapper>
    );
}