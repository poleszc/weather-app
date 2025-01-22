import { WEATHER_ICONS } from "../../../../../constsAndUtils";

export const CustomTooltip = ({ city, weather, weatherClass }) => {
    return (
        <div>
            <h3>{city.name} {WEATHER_ICONS[weatherClass]}</h3>
            {weather ? (
                <>
                    <p><strong>Temperature:</strong> {weather.temperature}°C</p>
                    <p><strong>Condition:</strong> {weather.condition}</p>
                    <p><strong>Humidity:</strong> {weather.humidity}%</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img 
                            src={`https:${weather.icon}`} 
                            alt={weather.condition} 
                            style={{ width: '50px', height: '50px' }}
                        />
                    </div>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};