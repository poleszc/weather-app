import { HeaderWrapper } from './HeaderWrapper.jsx';
// import { changeTheme } from ''

export const Header = () => {
    return (
        <HeaderWrapper>
            <div>
                <h1>Weather App</h1>
            </div>
            <div>
                <button>
                {/* <button onClick={changeTheme}> */}
                    Dark Mode
                </button>
            </div>
        </HeaderWrapper>
    );
}