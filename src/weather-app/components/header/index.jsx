import { HeaderWrapper } from './HeaderWrapper.jsx';

export const Header = () => {
    return (
        <HeaderWrapper>
            <div>
                <h1>Weather App</h1>
            </div>
            <div>
                <button>
                    Dark Mode
                </button>
            </div>
        </HeaderWrapper>
    );
}