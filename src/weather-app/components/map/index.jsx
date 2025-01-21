import { Icon } from "leaflet";
import React from "react";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import customMarkerIcon from '../../../assets/pin.png';
import { MapWrapper } from "./MapWrapper";
import { LoadingSpinner } from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { citiesAreLoadingSelector, citiesSelector, userLocationSelector } from "../../state/selectors";
import { locateUserStart } from "../../state/locationReducers";
import { DEFAULT_MAP_ZOOM, DEFAULT_MAP_LOCATION, DEFAULT_SCROLL_WHEEL_ZOOM } from "../../../const";
import { getCitiesStart, updateBounds } from "../../state/citiesReducers";

const MapMover = () => {
    // const userLocation = useSelector((state) => state.location.position);
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
    })


    return userLocation.lat === 0 && userLocation.lng === 0 ? null : (
        <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>
                You are here. <br />
            </Popup>
        </Marker>
    );
}




export const Map = () => {
    const cities = useSelector(citiesSelector);
    const citiesAreLoading = useSelector(citiesAreLoadingSelector);
    console.log(cities);

    const markers = [
        { coords: [48.86, 2.3522], text: "Popup1" },
        { coords: [48.85, 2.3522], text: "Popup2" },
        { coords: [48.855, 2.34], text: "Popup3" }
    ];

    const myIcon = new Icon({
        iconUrl: customMarkerIcon,
        iconSize: [38, 38]
    });

    const dispatch = useDispatch();
    
    const moveToLocation = () => {
        dispatch(locateUserStart());
    };


    return (
        <MapWrapper>
            <MapContainer 
                center={DEFAULT_MAP_LOCATION} 
                zoom={DEFAULT_MAP_ZOOM} 
                scrollWheelZoom={DEFAULT_SCROLL_WHEEL_ZOOM}
                style={{borderRadius: '10px'}}
                whenReady={moveToLocation}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {cities.map((city, index) => (
                    <Marker key={index} position={[city.lat, city.lng]} icon={myIcon}>
                        <Popup>
                            {city.name}
                        </Popup>
                    </Marker>
                ))
            }

            <MapMover />

            
            {citiesAreLoading && <LoadingSpinner/>}

            <button 
                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }} 
                onClick={moveToLocation}>
                    Center Map
            </button>

            </MapContainer>
        </MapWrapper>
    )
}