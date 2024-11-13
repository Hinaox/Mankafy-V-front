import { Injectable } from '@angular/core';
import User from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base_url = '';
  private user?: User;
  private authState = false;
  private adminState = false;

  public userSubject = new Subject<User | undefined>();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const user: User = localStorageService.retrieve('user');
    if (user) {
      this.authState = true;
      if (user.userRoles?.some((el) => el.role?.name == 'admin')) {
        this.adminState = true;
      }
    }
  }

  public baseUrl(path?: string) {
    if (path) return this.base_url + path;
    return this.base_url;
  }

  public setBase_url(base: string) {
    this.base_url = base;
  }

  public getUserInfo(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const url = this.baseUrl('/users/user_info');
      this.http.get(url).subscribe(
        (data) => {
          if (data) {
            resolve(data);
          } else {
            reject('invalid user');
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public getUser() {
    return this.user;
  }

  public setUser(data?: User) {
    if (data) {
      this.localStorageService.store('user', data);
      this.authState = true;
      if (data.userRoles) {
        if (data.userRoles.some((el) => el.role?.name == 'admin')) {
          this.adminState = true;
        }
      }
    } else {
      this.localStorageService.clear('user');
      this.adminState = false;
      this.authState = false;
    }
    this.user = data;
    console.log('user authentifié', data);

    this.userSubject.next(data);
  }

  public logout() {
    localStorage.removeItem('access_token');
    this.setUser(undefined);
  }

  public isAuth() {
    return this.authState;
  }

  public isAdmin() {
    return this.adminState;
  }
}
