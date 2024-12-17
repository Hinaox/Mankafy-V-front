import { Injectable } from '@angular/core';
import RouteDigraph from '../models/RouteDigraph';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RouteDigraphService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public findByLocation(locationId: number): Promise<RouteDigraph[]> {
    return new Promise<RouteDigraph[]>((resolve, reject) => {
      const url = this.authService.baseUrl(
        '/route-digraphs/byLocation?locationId=' + locationId
      );
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
