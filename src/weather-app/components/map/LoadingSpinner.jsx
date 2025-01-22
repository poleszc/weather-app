import { LoadingSpinnerWrapper } from "./LoadingSpinnerWrapper";
import FadeLoader from "react-spinners/FadeLoader";


export const LoadingSpinner = ({ isLoading }) => {
    return (
        <LoadingSpinnerWrapper>
            <FadeLoader
                loading={isLoading}
                size={150}
            />
        </LoadingSpinnerWrapper>
    );
}