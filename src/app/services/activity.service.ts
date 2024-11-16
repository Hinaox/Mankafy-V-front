import { Injectable } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import Activity from '../models/Activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  public save(body: Activity): Promise<Activity> {
    return new Promise<Activity>((resolve, reject) => {
      const url = this.authService.baseUrl('/activity');
      this.http.post(url, body).subscribe(
        (data: any) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // get all activity in location and children locations
  public findAllByLocation(locationId: number): Promise<Activity[]> {
    return new Promise<Activity[]>((resolve, reject) => {
      const url = this.authService.baseUrl(
        '/activity/byLocation?locationId=' + locationId
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
