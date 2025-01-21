import { Icon } from "leaflet";
import React from "react";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import customMarkerIcon from '../../../assets/pin.png';
import { MapWrapper } from "./MapWrapper";
import { useDispatch, useSelector } from "react-redux";
import { userLocationSelector } from "../../state/selectors";
import { locateUserStart } from "../../state/locationReducers";
import { DEFAULT_MAP_ZOOM, DEFAULT_MAP_LOCATION, DEFAULT_SCROLL_WHEEL_ZOOM } from "../../../const";

const MapMover = () => {
    // const userLocation = useSelector((state) => state.location.position);
    const userLocation = useSelector(userLocationSelector);
    const map = useMap();

    useEffect(() => {
        if (userLocation.lat !== 0 && userLocation.lng !== 0) {
            map.flyTo([userLocation.lat, userLocation.lng], DEFAULT_MAP_ZOOM);
        }
    }, [userLocation, map]);

    useMapEvent('moveend', () => {
        console.log("Map was moved");
        const bounds = map.getBounds();
        
        console.log(bounds);
        // getMapBounds();
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

                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.coords} icon={myIcon}>
                        <Popup>
                            {marker.text}
                        </Popup>
                    </Marker>
                ))
            }

            <MapMover />

            <button 
                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }} 
                onClick={moveToLocation}>
                    Center Map
            </button>

            </MapContainer>
        </MapWrapper>
    )
}