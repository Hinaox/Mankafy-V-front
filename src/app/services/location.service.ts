import { Injectable } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import Location from '../models/Location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private authService: AuthService, private http: HttpClient) {}

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
}
