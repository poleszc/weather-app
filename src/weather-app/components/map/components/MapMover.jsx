import { useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { userLocationSelector } from "../../../state/selectors";
import { DEFAULT_MAP_ZOOM } from "../../../../constsAndUtils";
import { getCitiesStart, updateBounds } from "../../../state/cityDataReducers";

export const MapMover = () => {
    const userLocation = useSelector(userLocationSelector);
    const dispatch = useDispatch();
    const map = useMap();

    useEffect(() => {
        if (userLocation.lat !== 0 && userLocation.lng !== 0) {
            map.flyTo([userLocation.lat, userLocation.lng], DEFAULT_MAP_ZOOM);
        }
    }, [userLocation, map]);

    useMapEvent('moveend', () => {
        console.log("Map was moved");
        const bounds = map.getBounds();
        const mapBounds = [
            bounds.getNorthEast().lat,
            bounds.getNorthEast().lng,
            bounds.getSouthWest().lat,
            bounds.getSouthWest().lng
        ];

        dispatch(updateBounds(mapBounds));
        dispatch(getCitiesStart());
        // dispatch(applyFilters()); // TODO: Apply filters afret map move?
    })

    return null;
}