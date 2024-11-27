import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import Activity from '../../../models/Activity';
import { RouteFetch } from '../../../models/Route';
import PlanningClient from '../../../models/PlanningClient';

@Component({
  selector: 'app-side-menu-break-point',
  templateUrl: './side-menu-break-point.component.html',
  styleUrl: './side-menu-break-point.component.scss',
})
export class SideMenuBreakPointComponent implements OnChanges {
  tab = 'presentation';

  @Input() devisEnCours?: PlanningClient;
  @Input() breakPoint?: Activity;
  @Input() route?: RouteFetch;
  distance?: number;
  arrival?: Date;
  departure?: Date;

  @Output() handleChoice = new EventEmitter<Activity>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['breakPoint']) {
      this.setBreakPoint(changes['breakPoint'].currentValue);
    }
    if (changes['route']) {
      this.setRoute(changes['route'].currentValue);
    }
    if (changes['devisEnCours']) {
      this.setDevisEnCours(changes['devisEnCours'].currentValue);
    }
  }

  setBreakPoint(data?: Activity) {
    this.breakPoint = data;
    this.setTab('presentation');
    this.distance = undefined;
    this.arrival = undefined;
    this.departure = undefined;
  }

  setTab(tab: string) {
    this.tab = tab;
  }

  setRoute(data?: RouteFetch) {
    this.route = data;
    console.log(data);

    if (data?.route?.routes)
      this.distance = data?.route?.routes[0].summary?.distance;
    if (this.distance) this.distance = this.distance / 1000;

    // set arrival date
    try {
      const departure = this.getNextDeparture();
      this.departure = departure;
      if (!departure) {
        throw 'undefined departure';
      }
      if (data?.route?.routes) {
        const duration = data.route.routes[0].summary?.duration;
        if (!duration) throw 'undefined duration';
        this.arrival = new Date(departure.getTime() + (duration + 7200) * 1000);
      } else {
        throw 'undefined data.route.routes';
      }
    } catch (error) {
      console.error(error);
    }
  }

  setDevisEnCours(data?: PlanningClient) {
    this.devisEnCours = data;
  }

  getNextDeparture(): Date | undefined {
    // temporaire
    if (this.devisEnCours?.dateDepart) {
      return new Date(this.devisEnCours.dateDepart);
    }
    return undefined;
  }
  setArrival(date?: Date) {
    this.arrival = date;
  }

  onBreakPointChoice() {
    this.handleChoice.emit(this.breakPoint);
  }
}
