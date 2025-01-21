import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { fetchCitiesStart, fetchCitiesSuccess, fetchCitiesFailure } from './mapSlice';

export const fetchCitiesEpic = (action$, state$) => {
    return action$.pipe(
        ofType(fetchCitiesStart.type),
        mergeMap(() => {
            const mapBounds = state$.value.map.bounds; // Zakładamy, że bounds są w stanie
            const [south, west, north, east] = mapBounds;

            const overpassQuery = `
                [out:json][timeout:25];
                (
                  node["place"="city"]((${south},${west},${north},${east}));
                );
                out body;
            `;

            const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

            return from(ajax.getJSON(overpassUrl)).pipe(
                map((response) => {
                    const cities = response.elements
                        .filter((el) => el.tags && el.tags.population)
                        .sort((a, b) => b.tags.population - a.tags.population)
                        .slice(0, 20)
                        .map((city) => ({
                            name: city.tags.name,
                            population: city.tags.population,
                            lat: city.lat,
                            lng: city.lon,
                        }));
                    return fetchCitiesSuccess(cities);
                }),
                catchError((error) => of(fetchCitiesFailure(error.message)))
            );
        })
    );
};

