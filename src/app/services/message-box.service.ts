import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageBoxService {
  public messageSubject = new Subject<{
    message: string;
    className: string;
    duration: number;
  }>();

  constructor() {}

  private emitMessage(message: string, className: string, duration: number) {
    this.messageSubject.next({ message, className, duration });
  }

  public show(message: string, duration: number = 2000) {
    this.emitMessage(message, 'normal', duration);
  }

  public success(message: string, duration: number = 2000) {
    this.emitMessage(message, 'success', duration);
  }

  public danger(message: string, duration: number = 2000) {
    this.emitMessage(message, 'danger', duration);
  }
}
