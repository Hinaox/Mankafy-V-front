import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import PlanningClient from '../../../models/PlanningClient';
import { ActivityService } from '../../../services/activity.service';
import Activity from '../../../models/Activity';
import { animate, style, transition, trigger } from '@angular/animations';
import PlanningClientActivity from '../../../models/PlanningClientActivity';
import { PlanningClientUtilsService } from '../../../utils/planning-client-utils.service';
import { LocalStorageService } from 'ngx-webstorage';

declare const bootstrap: any;

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
    standalone: false
})
export class SelectActivitiesComponent implements OnChanges, OnInit {
  @Input() devisEnCours?: PlanningClient;
  @Output() handleChange = new EventEmitter<PlanningClient>();

  filtersShown = false;

  triOptions: { value: string; label: string }[] = [
    { value: 'distance', label: 'Trié par distance' },
  ];
  tri = 'distance';

  // data for modal
  selectedActivity?: Activity;
  //
  selectedActivities: Activity[] = [];

  activities?: { activity: Activity; distance: number; duration: number }[];

  onRetour() {
    if (this.devisEnCours) {
      delete this.devisEnCours.location;
      this.handleChange.emit(this.devisEnCours);
    }
  }

  constructor(
    private activityService: ActivityService,
    private planningClientUtils: PlanningClientUtilsService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadActivities();
    // load selected Activities
    const selectedActivities = this.localStorageService.retrieve(
      'devisSelectedActivities'
    );
    if (selectedActivities) {
      this.selectedActivities = selectedActivities;
    }
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

  onOpenActivityModal(data?: Activity) {
    this.selectedActivity = data;
    const element = document.getElementById('modalActivityView');
    if (element) {
      const modal = bootstrap.Modal.getOrCreateInstance(element);
      modal.show();
    } else console.error('element introuvable');
  }

  onAddSelectedActivity() {
    if (this.selectedActivity) {
      if (this.devisEnCours) {
        try {
          // ajouter l'activité
          this.selectedActivities.push(this.selectedActivity);
          // stocker
          this.localStorageService.store(
            'devisSelectedActivities',
            this.selectedActivities
          );

          // fermer modal
          const element = document.getElementById('modalActivityView');
          if (element) {
            const modal = bootstrap.Modal.getOrCreateInstance(element);
            modal.hide();
          } else console.error('element introuvable');
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Undefined devis en cours');
      }
    } else {
      console.error('Undefined selected activity');
    }
  }

  isActivitySelected(activity: Activity) {
    return this.selectedActivities.some((el) => el.id == activity.id);
  }
}
