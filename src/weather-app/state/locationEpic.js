import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { locateUserStart, locateUserSuccess, locateUserFailure } from './locationSlice';

const getCurrentPosition = () =>
    new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );

export const locateUserEpic = (action$) =>
    action$.pipe(
        ofType(locateUserStart.type),
        mergeMap(() =>
            from(getCurrentPosition()).pipe(
                map((position) =>
                    locateUserSuccess({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                ),
                catchError((error) => of(locateUserFailure(error.message)))
            )
        )
    );
