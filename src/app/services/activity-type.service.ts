import { Injectable } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import ActivityType from '../models/ActivityType';

@Injectable({
  providedIn: 'root',
})
export class ActivityTypeService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  public findAll(): Promise<ActivityType> {
    return new Promise<ActivityType>((resolve, reject) => {
      const url = this.authService.baseUrl('/activity-types');
      this.http.get(url).subscribe(
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
