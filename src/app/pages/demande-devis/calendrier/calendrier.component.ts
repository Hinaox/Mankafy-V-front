import {
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import {
  CalendarView,
  CalendarDateFormatter,
  DateAdapter,
} from 'angular-calendar';

import {
  addPeriod,
  CalendarSchedulerEvent,
  CalendarSchedulerEventAction,
  CalendarSchedulerViewComponent,
  DAYS_IN_WEEK,
  endOfPeriod,
  SchedulerDateFormatter,
  SchedulerEventTimesChangedEvent,
  SchedulerViewDay,
  SchedulerViewHour,
  SchedulerViewHourSegment,
  startOfPeriod,
  subPeriod,
} from 'angular-calendar-scheduler';
import { Subject } from 'rxjs';

import { endOfDay, addMonths } from 'date-fns';
import { CalendarService } from '../../../services/calendar.service';
import PlanningClient from '../../../models/PlanningClient';
@Component({
    selector: 'app-calendrier',
    templateUrl: './calendrier.component.html',
    styleUrl: './calendrier.component.scss',
    standalone: false
})
export class CalendrierComponent implements OnChanges {
  // planning data
  @Input() devisEnCours?: PlanningClient;
  // end planning data

  CalendarView = CalendarView;

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  viewDays: number = DAYS_IN_WEEK;
  refresh: Subject<any> = new Subject();
  locale: string = 'en';
  hourSegments: any = 4;
  weekStartsOn: number = 1;
  startsWithToday: boolean = true;
  activeDayIsOpen: boolean = true;
  excludeDays: number[] = []; // [0];
  weekendDays: number[] = [0, 6];
  dayStartHour: number = 5;
  dayEndHour: number = 23;

  minDate: Date = new Date('2023-06-25');
  maxDate: Date = endOfDay(addMonths(new Date(), 1));

  dayModifier: Function;
  hourModifier: Function;
  segmentModifier: Function;
  eventModifier: Function;

  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;

  actions: CalendarSchedulerEventAction[] = [
    {
      when: 'enabled',
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
      title: 'Delete',
      onClick: (event: CalendarSchedulerEvent): void => {
        console.log("Pressed action 'Delete' on event " + event.id);
      },
    },
    {
      when: 'disabled',
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
      title: 'Restore',
      onClick: (event: CalendarSchedulerEvent): void => {
        console.log("Pressed action 'Restore' on event " + event.id);
      },
    },
  ];

  events: CalendarSchedulerEvent[] = [];

  @ViewChild(CalendarSchedulerViewComponent)
  calendarScheduler?: CalendarSchedulerViewComponent;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private calendarService: CalendarService,
    private dateAdapter: DateAdapter
  ) {
    this.locale = locale;

    this.dayModifier = ((day: SchedulerViewDay): void => {
      if (!this.isDateValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    }).bind(this);

    this.hourModifier = ((hour: SchedulerViewHour): void => {
      if (!this.isDateValid(hour.date)) {
        hour.cssClass = 'cal-disabled';
      }
    }).bind(this);

    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
      if (!this.isDateValid(segment.date)) {
        segment.isDisabled = true;
      }
    }).bind(this);

    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
      event.isDisabled = !this.isDateValid(event.start);
    }).bind(this);

    this.dateOrViewChanged();
  }

  ngOnInit(): void {
    this.calendarService
      .getEvents(this.actions)
      .then((events: CalendarSchedulerEvent[]) => (this.events = events));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devisEnCours']) {
      this.setDevisEnCours(changes['devisEnCours'].currentValue);
    }
  }

  setDevisEnCours(data?: PlanningClient) {
    this.devisEnCours = data;
    const dateDepart = this.devisEnCours?.dateDepart;
    if (dateDepart) {
      this.changeDate(dateDepart);
    } else console.error('Undefined dateDepart');
  }

  viewDaysOptionChanged(viewDays: number | string): void {
    const viewDaysNumber: number = parseFloat('' + viewDays);
    console.log('viewDaysOptionChanged', viewDays);
    if (this.calendarScheduler) {
      this.calendarScheduler.setViewDays(viewDaysNumber);
    } else {
      console.error('undefined calendarScheduler');
    }
  }

  changeDate(date: Date): void {
    console.log('changeDate', date);
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarView): void {
    console.log('changeView', view);
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    if (this.startsWithToday) {
      this.prevBtnDisabled = !this.isDateValid(
        subPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          this.viewDate,
          1
        )
      );
      this.nextBtnDisabled = !this.isDateValid(
        addPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          this.viewDate,
          1
        )
      );
    } else {
      this.prevBtnDisabled = !this.isDateValid(
        endOfPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          subPeriod(
            this.dateAdapter,
            CalendarView.Day /*this.view*/,
            this.viewDate,
            1
          )
        )
      );
      this.nextBtnDisabled = !this.isDateValid(
        startOfPeriod(
          this.dateAdapter,
          CalendarView.Day /*this.view*/,
          addPeriod(
            this.dateAdapter,
            CalendarView.Day /*this.view*/,
            this.viewDate,
            1
          )
        )
      );
    }

    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  private isDateValid(date: Date): boolean {
    return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate;
  }

  viewDaysChanged(viewDays: number): void {
    console.log('viewDaysChanged', viewDays);
    this.viewDays = viewDays;
  }

  dayHeaderClicked(day: SchedulerViewDay): void {
    console.log('dayHeaderClicked Day', day);
  }

  hourClicked(hour: SchedulerViewHour): void {
    console.log('hourClicked Hour', hour);
  }

  segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
    console.log('segmentClicked Action', action);
    console.log('segmentClicked Segment', segment);
  }

  eventClicked(action: string, event: CalendarSchedulerEvent): void {
    console.log('eventClicked Action', action);
    console.log('eventClicked Event', event);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: SchedulerEventTimesChangedEvent): void {
    console.log('eventTimesChanged Event', event);
    console.log('eventTimesChanged New Times', newStart, newEnd);
    let ev = this.events.find((e) => e.id === event.id);
    if (ev) {
      ev.start = newStart;
      ev.end = newEnd;
    } else {
      console.error('undefined ev');
    }
    this.refresh.next(1);
  }
}
