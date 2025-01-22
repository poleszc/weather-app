import React from 'react';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import { WEATHER_ICONS, assignWeatherClass } from '../../../../../constsAndUtils';
import { CustomTooltip } from './CustomTooltip';
import { createCustomIcon } from './CustomIcon';

export const CustomMarker = ({ city, weather }) => {
    const weatherClass = !weather ? 'Loading' : assignWeatherClass(weather);

    const myIcon = createCustomIcon({ weather, weatherClass });

    return (
        <Marker position={[city.lat, city.lng]} icon={myIcon}>
            <Tooltip>
                <CustomTooltip city={city} weather={weather} weatherClass={weatherClass} />
            </Tooltip>
        </Marker>
    );
};
