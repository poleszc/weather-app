import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, map, mergeMap } from 'rxjs/operators';
import { 
    getCitiesStart, 
    getCitiesSuccess, 
    getCitiesFailure, 
    applyFilters,
    updateFilteredCities
} from './citiesReducers';

import { DEFAULT_MAX_CITIES_NUMBER, DEFAULT_FILTER_DEBOUNCE_TIME } from '../../const';

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

            const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

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