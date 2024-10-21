import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base_url = '';

  constructor() {}

  public baseUrl(path?: string) {
    if (path) return this.base_url + path;
    return this.base_url;
  }

  public setBase_url(base: string) {
    this.base_url = base;
  }
}
