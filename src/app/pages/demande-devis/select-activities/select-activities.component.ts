import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import PlanningClient from '../../../models/PlanningClient';
import { ActivityService } from '../../../services/activity.service';
import Activity from '../../../models/Activity';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-select-activities',
  templateUrl: './select-activities.component.html',
  styleUrl: './select-activities.component.scss',
  animations: [
    trigger('slideTrigger', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SelectActivitiesComponent implements OnChanges, OnInit {
  @Input() devisEnCours?: PlanningClient;

  filtersShown = false;

  triOptions: { value: string; label: string }[] = [
    { value: 'distance', label: 'Trié par distance' },
  ];
  tri = 'distance';

  activities?: { activity: Activity; distance: number; duration: number }[];

  onRetour() {}

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devisEnCours']) {
      this.setDevisEnCours(changes['devisEnCours'].currentValue);
    }
  }

  setDevisEnCours(data?: PlanningClient) {
    this.devisEnCours = data;
  }

  async loadActivities() {
    try {
      if (this.devisEnCours?.location?.id) {
        this.activities =
          await this.activityService.findActivitiesByLocationWithDistanceDuration(
            this.devisEnCours.location.id
          );

        // trier le résultat
        this.activities.sort((a, b) => a.distance - b.distance);
        console.log(this.activities);
      } else {
        throw 'undefined devisEnCours.location.id';
      }
    } catch (error) {
      console.error(error);
    }
  }

  setFiltersShown(value: boolean) {
    this.filtersShown = value;
  }
}
