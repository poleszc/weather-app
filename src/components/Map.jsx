import React from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import customMarkerIcon from '../assets/pin.png';


const position = [51.505, -0.09]

function Map() {
    const userGeolocation = [48.8566, 2.3522]
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
    ]

    const myIcon = new Icon({
        iconUrl: customMarkerIcon,
        iconSize: [38, 38]
    })



    return (
            <MapContainer center={userGeolocation} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {markers.map(marker => (
                    <Marker position={marker.coords} icon={myIcon}>
                        <Popup>
                            {marker.text}
                        </Popup>
                    </Marker>
                ))
                }
            </MapContainer>
    )
}


// const Map =  (
//   <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }} scrollWheelZoom={false}>
//     <TileLayer
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
//     />
//     <Marker position={position}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Marker>
//     {/* {cities.map((city) => (
//       <Marker key={city.id} position={[city.lat, city.lon]}>
//         <Popup>
//           <div>
//             <h3>{city.name}</h3>
//             <p>Temperatura: {city.temp}°C</p>
//             Siema Eloo.
          
//           </div>
//         </Popup>
//       </Marker>
//     ))} */}
//   </MapContainer>
// );

export default Map;
