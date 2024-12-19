import { Injectable } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import ActivityType from '../models/ActivityType';

@Injectable({
  providedIn: 'root',
})
export class ActivityTypeService {
  public readonly BREAKPOINT_TYPE = 'breakPoint';
  public readonly RESTAURANT_TYPE = 'restaurant';
  public readonly ACTIVITY_TYPE = 'activity';

  constructor(private authService: AuthService, private http: HttpClient) {}

  activityTypes: ActivityType[] = [];

  public findAll(filtres?: any): Promise<ActivityType[]> {
    return new Promise<ActivityType[]>((resolve, reject) => {
      var url = this.authService.baseUrl('/activity-types?');

      for (let key in filtres) {
        url += `&${key}=${filtres[key]}`;
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
}
