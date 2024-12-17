import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './services/App/app.service';
import { LoadingService } from './services/loading/loading.service';
import { Subscription } from 'rxjs';
import { MessageBoxService } from './services/message-box.service';
import { animate, style, transition, trigger } from '@angular/animations';

import * as $ from 'jquery';
import { decodePolyline } from './utils/utils';
import { RouteFetch } from './models/Route';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [
        trigger('myInsertRemoveTrigger', [
            transition(':enter', [
                style({ opacity: 0, translate: '300px' }),
                animate('300ms', style({ opacity: 1, translate: '0px' })),
            ]),
            transition(':leave', [
                animate('300ms', style({ opacity: 0, translate: '300px' })),
            ]),
        ]),
        trigger('chatTipsTrigger', [
            transition(':enter', [
                style({ opacity: 0, width: 0 }),
                animate('500ms', style({ opacity: 1, width: 200 })),
            ]),
            transition(':leave', [animate('500ms', style({ opacity: 0, width: 0 }))]),
        ]),
    ],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'mankafy';

  loading = false;
  loadingSubscription?: Subscription;

  chatboxOpened = false;
  chatTipsShown = false;

  constructor(
    private appService: AppService,
    private loadingService: LoadingService,
    private messageBox: MessageBoxService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadingSubscription = this.loadingService.loadingSubject.subscribe(
      (data) => {
        this.loading = data;
      }
    );

    this.loading = true;
    try {
      await this.appService.loadUtils();
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chatTipsShown = true;
      setTimeout(() => {
        this.chatTipsShown = false;
      }, 10000);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

  onOpenChatBox() {
    this.chatboxOpened = true;
  }

  onCloseChatBox() {
    this.chatboxOpened = false;
  }

  onHideChatTips() {
    this.chatTipsShown = false;
  }
}
