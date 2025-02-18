import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { CustomTooltip } from './CustomTooltip';
import { createCustomIcon } from './CustomIcon';

export const CustomMarker = ({ city, weather }) => {
    const myIcon = createCustomIcon({ weather, weatherClass: city.weatherClass });

    return (
        <Marker position={[city.lat, city.lng]} icon={myIcon}>
            <Tooltip>
                <CustomTooltip city={city} weather={weather} weatherClass={city.weatherClass} />
            </Tooltip>
        </Marker>
    );
};
