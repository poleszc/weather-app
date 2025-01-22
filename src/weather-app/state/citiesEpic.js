import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, map, mergeMap } from 'rxjs/operators';
import { 
    getCitiesStart, 
    getCitiesSuccess, 
    getCitiesFailure, 
    getWeatherStart,
    getWeatherSuccess,
    getWeatherFailure,
    applyFilters,
    updateFilteredCities
} from './citiesReducers';

import { 
    DEFAULT_MAX_CITIES_NUMBER, 
    DEFAULT_FILTER_DEBOUNCE_TIME, 
    WEATHER_API_URL, 
    API_KEY, 
    OVERPASS_API_URL 
} from '../../const';

export const getCitiesEpic = (action$, state$) => {
    return action$.pipe(
        ofType(getCitiesStart.type),
        debounceTime(DEFAULT_FILTER_DEBOUNCE_TIME),
        mergeMap(() => {
            const mapBounds = state$.value.cities.bounds;
            const [N, E, S, W] = mapBounds;

            const overpassQuery = `
                [out:json];
                node
                  [place="city"]
                  (${S},${W},${N},${E});
                out;
            `;

            const overpassUrl = `${OVERPASS_API_URL}?data=${encodeURIComponent(overpassQuery)}`;

            return from(ajax.getJSON(overpassUrl)).pipe(
                map((response) => {
                    const cities = response.elements
                        .filter((el) => el.tags && el.tags.population)
                        .sort((a, b) => 
                            parseInt(b.tags.population, 10) - parseInt(a.tags.population, 10)
                        )
                        .slice(0, DEFAULT_MAX_CITIES_NUMBER)
                        .map((city) => ({
                            name: city.tags['name:en'] ?? city.tags.name,
                            population: city.tags.population,
                            lat: city.lat,
                            lng: city.lon,
                        }));
                    return getCitiesSuccess(cities);
                }),
                catchError((error) => of(getCitiesFailure(error.message)))
            );
        })
    );
};

export const filterCitiesEpic = (action$, state$) => {
    return action$.pipe(
        ofType(applyFilters.type),
        debounceTime(200),
        map(() => {
            const { cities, filter } = state$.value.cities;

            const filteredCities = cities.filter(city => {
                const cityNameMatches = city.name
                    .toLowerCase()
                    .includes(filter.city.toLowerCase());
                const populationMatches = city.population >= filter.population;

                return cityNameMatches && populationMatches;
            })
            console.log("Filtered cities: " + filteredCities);
            return updateFilteredCities(filteredCities);
        })
    );
};

export const getWeatherEpic = (action$, state$) => {
    return action$.pipe(
        // ofType(getWeatherStart.type),
        ofType(getCitiesSuccess.type),
        // debounceTime(500), // TODO: Is that needed?
        mergeMap((action) => {

            const cities = action.payload;
            
            return from(cities).pipe(
                mergeMap((city) => {
                    const weatherUrl = `${WEATHER_API_URL}?key=${API_KEY}&q=${city.lat},${city.lng}&units=metric`;
                    // console.log(weatherUrl);

                    return ajax.getJSON(weatherUrl).pipe(
                        map((weatherResponse) => {
                            // console.log("Response " + weatherResponse.location.name);
                            
                            const weatherData = {
                                name: weatherResponse.location.name,
                                country: weatherResponse.location.country,
                                temperature: weatherResponse.current.temp_c,
                                humidity: weatherResponse.current.humidity,
                                precip_mm: weatherResponse.current.precip_mm,
                                condition: weatherResponse.current.condition.text,
                                icon: weatherResponse.current.condition.icon,
                            };

                            // console.log(`Weather data for ${city.name}: ${weatherData}`);

                            return getWeatherSuccess({
                                cityName: city.name,
                                weatherData,
                            });
                        }),
                        catchError((error) => of(getWeatherFailure(error.message)))
                    );
                })
            );
        })
    )
};