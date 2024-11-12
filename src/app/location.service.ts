import { Injectable, Signal, signal } from "@angular/core";

@Injectable()
export class LocationService {
  private _locations = signal<string[]>([]);

  constructor() {}

  addLocation(zipcode: string) {
    this._locations.update((zips) => {
      const newZips = [...zips, zipcode];

      return newZips;
    });
  }

  removeLocation(zipcode: string) {
    this._locations.update((zips) => {
      let index = zips.indexOf(zipcode);

      if (index !== -1) {
        zips.splice(index, 1);
      }

      return zips;
    });
  }

  get currentLocations(): Signal<string[]> {
    return this._locations.asReadonly();
  }
}
