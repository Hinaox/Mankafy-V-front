import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = false;
  public loadingSubject = new Subject<boolean>();

  constructor() {}

  private setLoading(state: boolean) {
    this.loading = state;
    this.loadingSubject.next(state);
  }
  public startLoading() {
    this.setLoading(true);
  }
  public stopLoading() {
    this.setLoading(false);
  }
}
