import { Injectable } from '@angular/core';
import {
  CalendarSchedulerEvent,
  CalendarSchedulerEventStatus,
  CalendarSchedulerEventAction,
} from 'angular-calendar-scheduler';
import {
  addDays,
  startOfHour,
  addHours,
  subHours,
  setHours,
  subMinutes,
  addMinutes,
  startOfDay,
  setMinutes,
} from 'date-fns';

@Injectable()
export class CalendarService {
  getEvents(
    actions: CalendarSchedulerEventAction[]
  ): Promise<CalendarSchedulerEvent[]> {
    const events = [
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-01 07:00:00'),
        end: new Date('2025-01-01 11:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-01 11:00:00'),
        end: new Date('2025-01-01 12:00:00'),
        title: 'Gare Antsirabe',
        content: 'Gare Antsirabe',
        color: { primary: '#1e81b0', secondary: '#1e81b0' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-01 12:00:00'),
        end: new Date('2025-01-01 13:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-01 13:00:00'),
        end: new Date('2025-01-01 15:00:00'),
        title: 'Lac Tritriva',
        content: 'Lac Tritriva',
        color: { primary: '#1e81b0', secondary: '#1e81b0' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-01 15:00:00'),
        end: new Date('2025-01-01 16:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-01 19:00:00'),
        end: new Date('2025-01-02 08:00:00'),
        title: 'Hotel Vohitsoa',
        content: 'Hotel Vohitsoa',
        color: { primary: '#f7a857', secondary: '#f7a857' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-02 08:00:00'),
        end: new Date('2025-01-02 15:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-02 15:00:00'),
        end: new Date('2025-01-02 17:00:00'),
        title: 'Ranomafana',
        content: 'Ranomafana National Park',
        color: { primary: '#1e81b0', secondary: '#1e81b0' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-02 17:00:00'),
        end: new Date('2025-01-02 19:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-02 19:00:00'),
        end: new Date('2025-01-03 08:00:00'),
        title: 'Zomatel Hotel',
        content: 'Zomatel Hotel',
        color: { primary: '#f7a857', secondary: '#f7a857' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-03 08:00:00'),
        end: new Date('2025-01-03 16:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-03 16:00:00'),
        end: new Date('2025-01-03 17:00:00'),
        title: "Musée d'Isalo",
        content: "Musée d'Isalo",
        color: { primary: '#1e81b0', secondary: '#1e81b0' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-03 17:00:00'),
        end: new Date('2025-01-03 17:30:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-03 19:00:00'),
        end: new Date('2025-01-04 08:00:00'),
        title: 'Isalo Rock Lodge',
        content: 'Isalo Rock Lodge',
        color: { primary: '#f7a857', secondary: '#f7a857' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-04 12:00:00'),
        end: new Date('2025-01-04 12:30:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-04 12:30:00'),
        end: new Date('2025-01-04 13:30:00'),
        title: "Fenêtre d'Isalo",
        content: "Fenêtre d'Isalo",
        color: { primary: '#1e81b0', secondary: '#1e81b0' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-04 13:30:00'),
        end: new Date('2025-01-04 19:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-04 19:00:00'),
        end: new Date('2025-01-05 08:00:00'),
        title: 'Victory Hotel',
        content: 'Victory Hotel',
        color: { primary: '#f7a857', secondary: '#f7a857' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-05 11:00:00'),
        end: new Date('2025-01-05 12:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-05 12:00:00'),
        end: new Date('2025-01-05 15:00:00'),
        title: 'Andaboy',
        content: 'Andaboy',
        color: { primary: '#1e81b0', secondary: '#1e81b0' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-05 15:00:00'),
        end: new Date('2025-01-05 16:00:00'),
        title: 'Trajet',
        color: { primary: '#1e81b0', secondary: 'rgb(240, 240, 240)' },
      },
      <CalendarSchedulerEvent>{
        id: '99',
        start: new Date('2025-01-05 19:00:00'),
        end: new Date('2025-01-06 08:00:00'),
        title: 'Victory Hotel',
        content: 'Victory Hotel',
        color: { primary: '#f7a857', secondary: '#f7a857' },
      },
      // autres évenements
      <CalendarSchedulerEvent>{
        id: '1',
        start: addDays(startOfHour(new Date()), 1),
        end: addDays(addHours(startOfHour(new Date()), 1), 1),
        title: 'Event 1 (draggable)',
        content: 'IMPORTANT EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'danger' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
      <CalendarSchedulerEvent>{
        id: '12',
        start: subHours(addDays(startOfHour(new Date()), 1), 1),
        end: subHours(addDays(addHours(startOfHour(new Date()), 1), 1), 1),
        title: 'Event 12 (draggable)',
        content: 'IMPORTANT EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'danger' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
      <CalendarSchedulerEvent>{
        id: '2',
        start: addDays(startOfHour(new Date()), 2),
        end: subMinutes(addDays(addHours(startOfHour(new Date()), 2), 2), 15),
        title: 'Event 2',
        content: 'LESS IMPORTANT EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'warning' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '22',
        start: subHours(addDays(startOfHour(new Date()), 2), 1),
        end: subHours(addDays(addHours(startOfHour(new Date()), 1), 2), 1),
        title: 'Event 22',
        content: 'LESS IMPORTANT EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'warning' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '3',
        start: addDays(startOfHour(new Date()), 3),
        end: addDays(addHours(startOfHour(new Date()), 3), 3),
        title: 'Event 3',
        content: 'NOT IMPORTANT EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '32',
        start: subHours(addDays(startOfHour(new Date()), 3), 1),
        end: subHours(addDays(addHours(startOfHour(new Date()), 1), 3), 1),
        title: 'Event 32',
        content: 'NOT IMPORTANT EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '4',
        start: startOfHour(addHours(new Date(), 2)),
        end: addHours(startOfHour(addHours(new Date(), 2)), 2),
        title: 'Event 4',
        content: 'TODAY EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '5',
        start: addDays(startOfHour(setHours(new Date(), 6)), 2),
        end: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 1),
        title: 'Event 5',
        content: 'EARLY EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '51',
        start: addDays(startOfHour(setHours(new Date(), 6)), 2),
        end: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 1),
        title: 'Event 51',
        content: 'EARLY EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '52',
        start: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 1),
        end: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 2),
        title: 'Event 52',
        content:
          'EARLY EVENT WITH LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG DESCRIPTION',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '53',
        start: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 2),
        end: addMinutes(
          addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 2),
          30
        ),
        title: 'Event 53',
        content: 'EARLY EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '6',
        start: startOfHour(setHours(new Date(), 22)),
        end: addHours(startOfHour(setHours(new Date(), 22)), 10),
        title: 'Event 6',
        content: 'TWO DAYS EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '7',
        start: addDays(startOfHour(setHours(new Date(), 14)), 4),
        end: addDays(addDays(startOfHour(setHours(new Date(), 14)), 4), 2),
        title: 'Event 7',
        content: 'THREE DAYS EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '8',
        start: startOfHour(addHours(new Date(), 2)),
        end: addHours(startOfHour(addHours(new Date(), 2)), 3),
        title: 'Event 8',
        content: 'CONCURRENT EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '91',
        start: setMinutes(
          setHours(addDays(startOfHour(new Date()), 3), 10),
          30
        ),
        end: addMinutes(
          addHours(
            setMinutes(setHours(addDays(startOfHour(new Date()), 3), 10), 30),
            1
          ),
          45
        ),
        title: 'Event 91',
        content: 'TRIPLE EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '92',
        start: setMinutes(
          setHours(addDays(startOfHour(new Date()), 3), 10),
          30
        ),
        end: addHours(
          setMinutes(setHours(addDays(startOfHour(new Date()), 3), 10), 30),
          1
        ),
        title: 'Event 92',
        content: 'TRIPLE EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '93',
        start: setMinutes(
          setHours(addDays(startOfHour(new Date()), 3), 11),
          30
        ),
        end: addHours(
          setMinutes(setHours(addDays(startOfHour(new Date()), 3), 11), 30),
          1
        ),
        title: 'Event 93',
        content: 'TRIPLE EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '101',
        start: setMinutes(
          setHours(addDays(startOfHour(new Date()), 2), 10),
          30
        ),
        end: addHours(
          setMinutes(setHours(addDays(startOfHour(new Date()), 2), 10), 30),
          1
        ),
        title: 'Event 101',
        content: 'DOUBLE EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
      <CalendarSchedulerEvent>{
        id: '102',
        start: setMinutes(
          setHours(addDays(startOfHour(new Date()), 2), 11),
          30
        ),
        end: addHours(
          setMinutes(setHours(addDays(startOfHour(new Date()), 2), 11), 30),
          1
        ),
        title: 'Event 102',
        content: 'DOUBLE EVENT',
        color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        actions: actions,
        status: 'ok' as CalendarSchedulerEventStatus,
        isClickable: true,
        isDisabled: false,
      },
    ];

    return new Promise((resolve) => setTimeout(() => resolve(events), 3000));
  }
}
