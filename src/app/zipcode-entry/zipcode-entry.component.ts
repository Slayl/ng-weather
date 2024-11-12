import { Component } from "@angular/core";
import { LocationService } from "../location.service";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-zipcode-entry",
  templateUrl: "./zipcode-entry.component.html",
})
export class ZipcodeEntryComponent {
  constructor(
    private _locationService: LocationService,
    private _weatherService: WeatherService
  ) {}

  addLocation(zipcode: string) {
    this._locationService.addLocation(zipcode);
    this._weatherService.addCurrentConditions(zipcode);
  }
}
