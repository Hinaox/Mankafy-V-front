import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DemandeDevisComponent } from './demande-devis.component';
import { AppModule } from '../../app.module';
import { ChooseDestinationComponent } from './choose-destination/choose-destination.component';
import { SelectBreakPointComponent } from './select-break-point/select-break-point.component';
import { SelectDatePeopleComponent } from './select-date-people/select-date-people.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinationMapComponent } from './destination-map/destination-map.component';
import { BreakpointMapComponent } from './breakpoint-map/breakpoint-map.component';
import { SideMenuBreakPointComponent } from './side-menu-break-point/side-menu-break-point.component';
import { SelectActivitiesComponent } from './select-activities/select-activities.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivityMapComponent } from './activity-map/activity-map.component';
import { ActivitySuggestionViewComponent } from './select-activities/activity-suggestion-view/activity-suggestion-view.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from 'ngx-webstorage';
import { PlanningService } from '../../services/planning.service';
import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import moment from 'moment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorInterceptor } from '../../services/httpInterceptor/http-interceptor.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalendarService } from '../../services/calendar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DemandeDevisComponent,
    ChooseDestinationComponent,
    SelectBreakPointComponent,
    SelectDatePeopleComponent,
    DestinationMapComponent,
    BreakpointMapComponent,
    SideMenuBreakPointComponent,
    SelectActivitiesComponent,
    ActivityMapComponent,
    ActivitySuggestionViewComponent,
    CalendrierComponent,
  ],
  imports: [
    CommonModule,
    AppModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,

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
export class DemandeDevisModule {}
