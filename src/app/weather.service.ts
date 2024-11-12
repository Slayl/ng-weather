import { Injectable, Signal, signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { CacheService } from "./cache.service";
import { ConditionsAndZip } from "./conditions-and-zip.type";
import { CurrentConditions } from "./current-conditions/current-conditions.type";
import { Forecast } from "./forecasts-list/forecast.type";

export const WEATHER_KEY_STORAGE = "weather";

@Injectable()
export class WeatherService {
  static URL = "https://api.openweathermap.org/data/2.5";
  static APPID = "5a4b2d457ecbef9eb2a71e480b947604";
  static ICON_URL =
    "https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/";
  private _currentConditions = signal<ConditionsAndZip[]>([]);

  constructor(private _http: HttpClient, private _cacheService: CacheService) {
    const conditions =
      this._cacheService.get<ConditionsAndZip[]>(WEATHER_KEY_STORAGE);

    if (conditions) {
      this._currentConditions.set(conditions);
    }
  }

  addCurrentConditions(zipcode: string): void {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    this._http
      .get<CurrentConditions>(
        `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
      )
      .subscribe((data) =>
        this._currentConditions.update((conditions) => {
          const newConditions = [...conditions, { zip: zipcode, data }];

          this._cacheService.set(WEATHER_KEY_STORAGE, newConditions);

          return newConditions;
        })
      );
  }

  removeCurrentConditions(zipcode: string) {
    this._currentConditions.update((conditions) => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode) conditions.splice(+i, 1);
      }

      this._cacheService.set(WEATHER_KEY_STORAGE, conditions);

      return conditions;
    });
  }

  get currentConditions(): Signal<ConditionsAndZip[]> {
    return this._currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    const cachedForecast = this._cacheService.get<Forecast>(zipcode);

    if (cachedForecast) {
      return of(cachedForecast);
    }

    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this._http
      .get<Forecast>(
        `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
      )
      .pipe(tap((forecast) => this._cacheService.set(zipcode, forecast)));
  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else return WeatherService.ICON_URL + "art_clear.png";
  }
}
