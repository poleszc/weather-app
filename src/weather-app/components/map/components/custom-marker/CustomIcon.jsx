import L from 'leaflet';
import { WEATHER_ICONS } from '../../../../../constsAndUtils';

export const createCustomIcon = ({ weather, weatherClass }) => {
    return L.divIcon({
        className: 'custom-icon',
        html: `
            <div style="display: flex; flex-direction: row; align-items: center; 
                        background-color: rgba(255, 255, 255, 0.7); 
                        border-radius: 10px; 
                        padding: 5px; 
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                        width: 60px; height: 40px; justify-content: center;"
            >
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">

                    ${!weather ? `
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
};
