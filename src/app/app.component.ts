import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from './services/App/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'mankafy';
  loading = false;

  constructor(private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    try {
      await this.appService.loadUtils();
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }
}
