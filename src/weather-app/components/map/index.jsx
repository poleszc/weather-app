import { Icon } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import customMarkerIcon from '../../../assets/pin.png';
import { MapWrapper } from "./MapWrapper";

export const Map = () => {
    const defaultLocation = [0, 0];
    const markers = [
        {
            coords: [48.86, 2.3522],
            text: "Popup1"
        },
        {
            coords: [48.85, 2.3522],
            text: "Popup2"
        },
        {
            coords: [48.855, 2.34],
            text: "Popup3"
        }
    ];

    const myIcon = new Icon({
        iconUrl: customMarkerIcon,
        iconSize: [38, 38]
    });



    // const map = useMap();


    return (
        <MapWrapper>
            <MapContainer 
                center={defaultLocation} 
                zoom={5} 
                scrollWheelZoom={true}
                style={{borderRadius: '10px'}}
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

            <button style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
                    Center Map
            </button>

            </MapContainer>
        </MapWrapper>
    )
}