import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandeDevisActivitiesComponent } from './demande-devis-activities.component';
import { SelectBreakpointsComponent } from './select-breakpoints/select-breakpoints.component';
import { SelectFinalDestinationComponent } from './select-breakpoints/select-final-destination/select-final-destination.component';
import { DestinationMapComponent } from './select-breakpoints/select-final-destination/destination-map/destination-map.component';
import { LocationSideMenuComponent } from './select-breakpoints/select-final-destination/destination-map/location-side-menu/location-side-menu.component';
import { BreakpointsPageComponent } from './select-breakpoints/breakpoints-page/breakpoints-page.component';
import { FirstBreakpointPageComponent } from './select-breakpoints/breakpoints-page/first-breakpoint-page/first-breakpoint-page.component';
import { NextBreakpointPageComponent } from './select-breakpoints/breakpoints-page/next-breakpoint-page/next-breakpoint-page.component';
import { PlanningCalendarComponent } from './select-breakpoints/breakpoints-page/planning-calendar/planning-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatSliderModule } from '@angular/material/slider';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from 'ngx-webstorage';
import { PlanningService } from '../../services/planning.service';
import moment from 'moment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorInterceptor } from '../../services/httpInterceptor/http-interceptor.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalendarService } from '../../services/calendar.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DemandeDevisActivitiesComponent,
    SelectBreakpointsComponent,
    SelectFinalDestinationComponent,
    DestinationMapComponent,
    LocationSideMenuComponent,
    BreakpointsPageComponent,
    FirstBreakpointPageComponent,
    NextBreakpointPageComponent,
    PlanningCalendarComponent,
  ],
  imports: [
    AppModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

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
    MatTooltipModule,
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
})
export class DemandeDevisActivitiesModule {}
