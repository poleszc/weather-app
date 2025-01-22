import { Icon } from "leaflet";
import React from "react";
import { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvent } from "react-leaflet";
import customMarkerIcon from '../../../assets/pin.png';
import { MapWrapper } from "./MapWrapper";
import { LoadingSpinner } from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";

import { 
    citiesAreLoadingSelector, 
    citiesSelector, 
    userLocationSelector, 
    filteredCitiesSelector, 
    weatherByCitySelector,
    maxPopulationInVisibleCitiesSelector
} from "../../state/selectors";

import { locateUserStart } from "../../state/locationReducers";
import { DEFAULT_MAP_ZOOM, DEFAULT_MAP_LOCATION, DEFAULT_SCROLL_WHEEL_ZOOM } from "../../../const";
import { 
    applyFilters, 
    getCitiesStart, 
    updateBounds, 
    updateFilteredCities 
} from "../../state/citiesReducers";

const MapMover = () => {
    const userLocation = useSelector(userLocationSelector);
    const map = useMap();
    const dispatch = useDispatch();

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




export const Map = () => {
    const cities = useSelector(filteredCitiesSelector);
    const citiesAreLoading = useSelector(citiesAreLoadingSelector);
    const weatherByCity = useSelector(weatherByCitySelector);
    
    const dispatch = useDispatch();

    // console.log("Weather by city: " + JSON.stringify(weatherByCity, null, 2));

    const myIcon = new Icon({
        iconUrl: customMarkerIcon,
        iconSize: [38, 38]
    });
    
    
    const moveToLocation = () => {
        dispatch(locateUserStart());
    };
      
    return (
        <MapWrapper>
            <MapContainer 
                center={DEFAULT_MAP_LOCATION} 
                zoom={DEFAULT_MAP_ZOOM} 
                scrollWheelZoom={DEFAULT_SCROLL_WHEEL_ZOOM}
                style={{borderRadius: '10px', position: 'relative'}}
                whenReady={moveToLocation}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {cities.map((city, index) => {
                    const weather = weatherByCity[city.name];

                    return (
                        <Marker key={index} position={[city.lat, city.lng]} icon={myIcon}>
                            <Tooltip>
                                <div>
                                    <h3>{city.name}</h3>
                                    {weather ? (
                                        <>
                                            <p><strong>Temperature:</strong> {weather.temperature}°C</p>
                                            <p><strong>Condition:</strong> {weather.condition}</p>
                                            <p><strong>Humidity:</strong> {weather.humidity}%</p>
                                            <img 
                                                src={`https:${weather.icon}`} 
                                                alt={weather.condition} 
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </>
                                    ) : (
                                        <p>Loading weather data...</p>
                                    )}
                                </div>
                            </Tooltip>
                        </Marker>
                    );
                })}

            <MapMover />
            <LoadingSpinner isLoading={citiesAreLoading}/>

            <button 
                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }} 
                onClick={moveToLocation}>
                    Center Map
            </button>

            </MapContainer>
        </MapWrapper>
    )
}