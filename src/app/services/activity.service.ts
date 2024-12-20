import { Injectable } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import Activity from '../models/Activity';
import { ActivityTypeService } from './activity-type.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private activityTypeService: ActivityTypeService
  ) {}

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

  public findActivitiesByLocation(locationId: number): Promise<Activity[]> {
    return new Promise<Activity[]>(async (resolve, reject) => {
      // first, get activity type id
      const activityType = await this.activityTypeService.findAll({
        name: this.activityTypeService.ACTIVITY_TYPE,
      });
      if (activityType.length) {
        const activityTypeId = activityType[0].id;
        const url = this.authService.baseUrl(
          '/activity/byLocation?locationId=' +
            locationId +
            '&activityTypeId=' +
            activityTypeId
        );
        this.http.get(url).subscribe(
          (data: any) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        reject('Type activity introuvable');
      }
    });
  }

  public findActivitiesByLocationWithDistanceDuration(
    locationId: number
  ): Promise<{ activity: Activity; distance: number; duration: number }[]> {
    return new Promise<
      { activity: Activity; distance: number; duration: number }[]
    >(async (resolve, reject) => {
      // first, get activity type id
      const activityType = await this.activityTypeService.findAll({
        name: this.activityTypeService.ACTIVITY_TYPE,
      });
      if (activityType.length) {
        const activityTypeId = activityType[0].id;
        const url = this.authService.baseUrl(
          '/activity/byLocationWithDistanceDuration?locationId=' +
            locationId +
            '&activityTypeId=' +
            activityTypeId
        );
        this.http.get(url).subscribe(
          (data: any) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        reject('Type activity introuvable');
      }
    });
  }

  public findBreakPointsByLocation(locationId: number): Promise<Activity[]> {
    return new Promise<Activity[]>(async (resolve, reject) => {
      // first, get breakpoint type id
      const activityType = await this.activityTypeService.findAll({
        name: this.activityTypeService.BREAKPOINT_TYPE,
      });
      if (activityType.length) {
        const activityTypeId = activityType[0].id;
        const url = this.authService.baseUrl(
          '/activity/byLocation?locationId=' +
            locationId +
            '&activityTypeId=' +
            activityTypeId
        );
        this.http.get(url).subscribe(
          (data: any) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        reject('Type breakpoint introuvable');
      }
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

  public getDistanceDuration(
    activity_id: number,
    another_activity_id: number | null
  ): Promise<{ distance: number; duration: number }> {
    return new Promise<{ distance: number; duration: number }>(
      (resolve, reject) => {
        var url = this.authService.baseUrl(
          '/map/distanceBetweenActivities?activity_id=' + activity_id
        );
        if (another_activity_id) {
          url += '&another_activity_id=' + another_activity_id;
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
}
