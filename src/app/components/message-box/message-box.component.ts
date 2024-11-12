import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageBoxService } from '../../services/message-box.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss',
})
export class MessageBoxComponent implements OnInit {
  messageShown = false;
  message: string = '';
  messageClass: string = 'normal';

  messageSubscription?: Subscription;

  constructor(private messageBoxService: MessageBoxService) {}

  ngOnInit(): void {
    this.messageSubscription = this.messageBoxService.messageSubject.subscribe(
      (data) => {
        this.showMessage(data);
      }
    );
  }

  showMessage(data: { message: string; className: string; duration: number }) {
    this.message = data.message;
    this.messageClass = data.className;
    this.messageShown = true;
    if (data.duration > 0) {
      setTimeout(() => {
        this.hideMessage();
      }, data.duration);
    }
  }

  hideMessage() {
    this.messageShown = false;
  }
}
