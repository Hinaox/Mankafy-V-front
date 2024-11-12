import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './services/App/app.service';
import { LoadingService } from './services/loading/loading.service';
import { Subscription } from 'rxjs';
import { MessageBoxService } from './services/message-box.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mankafy';

  loading = false;
  loadingSubscription?: Subscription;

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

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
