import { WEATHER_ICONS } from "../../../../../constsAndUtils";

export const CustomTooltip = ({ city, weather, weatherClass }) => {
    return (
        <div>
            <h3>{city.name} {WEATHER_ICONS[weatherClass]}</h3>
            {weather ? (
                <>
                    <p><strong>Temperature:</strong> {weather.temperature}°C</p>
                    <p><strong>Feels like:</strong> {weather.feelsLike}°C</p>
                    <p><strong>Humidity:</strong> {weather.humidity}%</p>
                    <p><strong>Pressure:</strong> {weather.pressure}hPa</p>
                    {weather.precip_mm !== 0 && <p><strong>Rain:</strong> {weather.precip_mm}mm</p>}
                    <p><strong>Condition:</strong> {weather.condition}</p>
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