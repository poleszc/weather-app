import 'leaflet/dist/leaflet.css';
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";

import { LoadingSpinner, MapMover, CustomMarker, MapWrapper, CenterButton } from "./components";
import { locateUserStart } from "../../state/locationReducers";
import { citiesAreLoadingSelector, filteredCitiesSelector, weatherByCitySelector } from "../../state/selectors";
import { DEFAULT_MAP_ZOOM, DEFAULT_MAP_LOCATION, DEFAULT_SCROLL_WHEEL_ZOOM } from "../../../constsAndUtils";

export const Map = () => {
    const cities = useSelector(filteredCitiesSelector);
    const citiesAreLoading = useSelector(citiesAreLoadingSelector);
    const weatherByCity = useSelector(weatherByCitySelector);    
    const dispatch = useDispatch();

    return (
        <MapWrapper>
            <MapContainer 
                center={DEFAULT_MAP_LOCATION} 
                zoom={DEFAULT_MAP_ZOOM} 
                scrollWheelZoom={DEFAULT_SCROLL_WHEEL_ZOOM}
                style={{borderRadius: '10px', position: 'relative'}}
                whenReady={() => {dispatch(locateUserStart());}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {cities.map((city, index) => {
                    const weather = weatherByCity[city.name];
                    return <CustomMarker key={index} city={city} weather={weather} />;
                })}

                <MapMover />
                <LoadingSpinner isLoading={citiesAreLoading}/>
                <CenterButton />
            </MapContainer>
        </MapWrapper>
    )
}