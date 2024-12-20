import { AppComponent } from './app.component';
import { DateFRPipe } from './utils/DateFR.pipe';
import { DatetimeFRPipe } from './utils/DatetimeFR.pipe';
import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorInterceptor } from './services/httpInterceptor/http-interceptor.interceptor';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TestComponent } from './pages/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanningComponent } from './pages/planning/planning.component';
import { DatePipe, registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import moment from 'moment';
import { PlanningService } from './services/planning/planning.service';
import { CreateActivityComponent } from './pages/create-activity/create-activity.component';
import { MapComponent } from './components/map/map.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import {
  provideNgxWebstorage,
  withNgxWebstorageConfig,
  withLocalStorage,
  withSessionStorage,
} from 'ngx-webstorage';
import { CreateActivityTypeComponent } from './components/create-activity-type/create-activity-type.component';
import { CreateActivityTypePageComponent } from './pages/create-activity-type-page/create-activity-type-page.component';
import { CreateLocationComponent } from './pages/create-location/create-location.component';
import { ChatComponent } from './components/chat/chat.component';
import { ModalComponent } from './components/modal/modal.component';
import { CalendarService } from './services/calendar.service';
import { ModalLargeComponent } from './components/modal-large/modal-large.component';
import { PayementComponent } from './pages/payement/payement.component';
import { PayementInfoComponent } from './components/payement-info/payement-info.component';
import { PayementFormComponent } from './components/payement-form/payement-form.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StylizedButtonComponent } from './components-utils/stylized-button/stylized-button.component';
import { ActivitySheetComponent } from './components/activity-sheet/activity-sheet.component';
import { ActivityTooltipButtonComponent } from './components/activity-tooltip-button/activity-tooltip-button.component';
import { VoyageDetailsComponent } from './pages/voyage-details/voyage-details.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    DateFRPipe,
    AppComponent,
    DatetimeFRPipe,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    GalleryComponent,
    TestComponent,
    PlanningComponent,
    CreateActivityComponent,
    MapComponent,
    MessageBoxComponent,
    CreateActivityTypeComponent,
    CreateActivityTypePageComponent,
    CreateLocationComponent,
    ChatComponent,
    ModalComponent,
    ModalLargeComponent,
    PayementComponent,
    PayementInfoComponent,
    PayementFormComponent,
    StylizedButtonComponent,
    VoyageDetailsComponent,
    ActivitySheetComponent,
    ActivityTooltipButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SchedulerModule.forRoot({
      locale: 'en',
      headerDateFormat: 'daysRange',
      logEnabled: true,
    }),
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  exports: [
    MapComponent,
    DateFRPipe,
    DatetimeFRPipe,
    ModalComponent,
    ModalLargeComponent,
    StylizedButtonComponent,
  ],
  providers: [
    DatePipe,
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ),
    PlanningService,
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: MOMENT, useValue: moment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
    CalendarService,
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: MOMENT, useValue: moment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
