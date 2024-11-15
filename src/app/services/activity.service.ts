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
      const url = this.authService.baseUrl('/location');
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
}
