import { useDispatch } from "react-redux"
import { locateUserStart } from "../../../state/locationReducers"

export const CenterButton = () => {
    const dispatch = useDispatch();

    return (
        <button 
            style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                zIndex: 1000 
            }} 
            onClick={() => {dispatch(locateUserStart())}}>
                Center Map
        </button>
    );
}