import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, map, mergeMap } from 'rxjs/operators';
import { getCitiesStart, getCitiesSuccess, getCitiesFailure } from './citiesReducers';

export const getCitiesEpic = (action$, state$) => {
    return action$.pipe(
        ofType(getCitiesStart.type),
        debounceTime(200),
        mergeMap(() => {
            console.log("Overpass API");
            const mapBounds = state$.value.cities.bounds; // Zakładamy, że bounds są w stanie
            console.log(mapBounds);
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
                        .sort((a, b) => b.tags.population - a.tags.population)
                        .slice(0, 20)
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

