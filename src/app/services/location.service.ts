import { Injectable } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import Location from '../models/Location';
import { RouteFetch } from '../models/Route';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  public getDistanceDuration(
    location_id: number,
    another_location_id?: number
  ): Promise<{ distance: number; duration: number }> {
    return new Promise<{ distance: number; duration: number }>(
      (resolve, reject) => {
        var url = this.authService.baseUrl(
          '/map/distanceDuration?location_id=' + location_id
        );
        if (another_location_id) {
          url += '&another_location_id=' + another_location_id;
        }
        this.http.get(url).subscribe(
          (data: any) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
      }
    );
  }

  public getRouteBetweenLocations(
    location_id: number,
    another_location_id?: number
  ): Promise<RouteFetch> {
    return new Promise<RouteFetch>((resolve, reject) => {
      var url = this.authService.baseUrl(
        `/map/locationsRoutes?location_id=${location_id}`
      );
      if (another_location_id) {
        url += `&another_location_id=${another_location_id}`;
      }
      this.http.get(url).subscribe(
        (data: any) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public findAll(): Promise<Location[]> {
    return new Promise<Location[]>((resolve, reject) => {
      const url = this.authService.baseUrl('/location');
      this.http.get(url).subscribe(
        (data: any) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public save(body: Location): Promise<Location> {
    return new Promise<Location>((resolve, reject) => {
      const url = this.authService.baseUrl('/location');
      this.http.post(url, body).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public findParents(): Promise<Location[]> {
    return new Promise<Location[]>((resolve, reject) => {
      const url = this.authService.baseUrl('/location/parents');
      this.http.get(url).subscribe(
        (data: any) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
