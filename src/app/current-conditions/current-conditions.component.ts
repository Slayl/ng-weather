import { Component, inject, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { ConditionsAndZip } from "../conditions-and-zip.type";
import { LocationService } from "../location.service";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-current-conditions",
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent {
  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> =
    this.weatherService.currentConditions;

  constructor() {}

  showForecast(zipcode: string) {
    this.router.navigate(["/forecast", zipcode]);
  }

  removeCondition(index: number) {
    const currentConditions = this.weatherService.currentConditions();

    if (currentConditions[index]) {
      const currentCondition = currentConditions[index];

      this.weatherService.removeCurrentConditions(currentCondition.zip);
      this.locationService.removeLocation(currentCondition.zip);
    }
  }
}
