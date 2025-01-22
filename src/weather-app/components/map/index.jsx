import 'leaflet/dist/leaflet.css';
import React from "react";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvent } from "react-leaflet";
import { MapWrapper } from "./MapWrapper";
import { LoadingSpinner } from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";

import { 
    citiesAreLoadingSelector, 
    userLocationSelector, 
    filteredCitiesSelector, 
    weatherByCitySelector,
} from "../../state/selectors";

import { locateUserStart } from "../../state/locationReducers";
import { DEFAULT_MAP_ZOOM, DEFAULT_MAP_LOCATION, DEFAULT_SCROLL_WHEEL_ZOOM, IDEAL_TEMP, WEATHER_ICONS } from "../../../const";
import { 
    getCitiesStart, 
    updateBounds, 
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

    const moveToLocation = () => {
        dispatch(locateUserStart());
    };
      

    const assignWeatherClass = (weather) => {
        const isNoRain = weather.precip_mm === 0;
        const isIdealTemp = weather.temperature >= IDEAL_TEMP.min &&
                            weather.temperature <= IDEAL_TEMP.max;

        if (isIdealTemp && isNoRain) {
            return 'Nice';
        }
        if (!isIdealTemp && !isNoRain) {
            return 'Not Nice';
        }
        return 'Passable';
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
                    const isWeatherLoading = !weather;
                    const weatherClass = isWeatherLoading ? 'Loading': assignWeatherClass(weather);

                    const myIcon = L.divIcon({
                        className: 'custom-icon',
                        html: `
                            <style>
                                @keyframes spin {
                                    0% {
                                        transform: rotate(0deg);
                                    }
                                    100% {
                                        transform: rotate(360deg);
                                    }
                                }
                            </style>
                            <div style="display: flex; flex-direction: row; align-items: center; 
                                        background-color: rgba(255, 255, 255, 0.7); 
                                        border-radius: 10px; 
                                        padding: 5px; 
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                                        width: 60px; height: 40px; justify-content: center;
                            ">
                                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                                    ${isWeatherLoading ? `
                                        <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%;
                                                    width: 24px; height: 24px; animation: spin 2s linear infinite;">
                                        </div>`  
                                    : `
                                        <span style="font-size: 16px; margin-right: 5px;">${WEATHER_ICONS[weatherClass]}</span>
                                        <img src="https:${weather.icon}" alt="${weather.condition}" style="width: 30px; height: 30px; border-radius: 5px;" />
                                    `}
                                </div>
                            </div>`,
                        iconSize: [60, 60],
                        iconAnchor: [30, 45],
                    });


                    return (
                        <Marker key={index} position={[city.lat, city.lng]} icon={myIcon}>
                            <Tooltip>
                                <div>
                                    <h3>{city.name} {WEATHER_ICONS[weatherClass]}</h3>
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