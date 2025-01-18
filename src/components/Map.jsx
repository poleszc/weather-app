import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const position = [51.505, -0.09]

function Map() {

    return (
        <>
            <MapContainer className="map-container" center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
        </>
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
