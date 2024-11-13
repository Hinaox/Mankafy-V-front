import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import User from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async loadUtils() {
    try {
      // charger base url
      await this.loadBaseUrl();
      // then, get the user_info
      const userInfo: User = await this.authService.getUserInfo();
      this.authService.setUser(userInfo);
    } catch (error) {
      console.error(error);
      this.authService.setUser(undefined);
    }
  }

  loadBaseUrl(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('/assets/config.json').subscribe(
        (data: any) => {
          const url = data.baseUrl;
          if (url) {
            this.authService.setBase_url(url);
            resolve();
          } else {
            reject('Undefined base_url in config');
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  waitTsotraIzao(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
}
