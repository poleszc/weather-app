import { ofType } from 'redux-observable';
import { from, interval, of } from 'rxjs';
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
    updateFilteredCities,
    clearWeatherData
} from './citiesReducers';

import { 
    DEFAULT_MAX_CITIES_NUMBER, 
    DEFAULT_FILTER_DEBOUNCE_TIME, 
    WEATHER_API_URL, 
    API_KEY, 
    OVERPASS_API_URL,
    DEFAULT_WEATHER_REFRESH_INTERVAL
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
        ofType(getCitiesSuccess.type),
        debounceTime(1000), // TODO: Is that needed?
        mergeMap((action) => {

            const cities = action.payload;
            const weatherByCity = state$.value.cities.weatherByCity;

            const citiesToFetch = cities.filter(city => !weatherByCity[city.name])

            console.log(`All cities ${cities.length}, fetching: ${citiesToFetch.length}`);
            console.log(`Dict size: ${Object.keys(weatherByCity).length}`);

            if (citiesToFetch.length === 0) {
                console.log("No reload");
                return of();
            }
            
            return from(citiesToFetch).pipe(
                mergeMap((city) => {
                    const weatherUrl = `${WEATHER_API_URL}?key=${API_KEY}&q=${city.lat},${city.lng}`;

                    return ajax.getJSON(weatherUrl).pipe(
                        map((weatherResponse) => {
                            const weatherData = {
                                name: weatherResponse.location.name,
                                country: weatherResponse.location.country,
                                temperature: weatherResponse.current.temp_c,
                                humidity: weatherResponse.current.humidity,
                                precip_mm: weatherResponse.current.precip_mm,
                                condition: weatherResponse.current.condition.text,
                                icon: weatherResponse.current.condition.icon,
                            };

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


export const refreshWeatherEpic = (action$, state$) => {
    return interval(DEFAULT_WEATHER_REFRESH_INTERVAL).pipe(
        map(() => {
            console.log("Refresh data")
            const { cities } = state$.value.cities;

            if (!Array.isArray(cities) || cities.length === 0) {
                return of();
            }

            return [clearWeatherData(), getCitiesSuccess(cities)];
        }),
        mergeMap((actions) => actions)
    );
};