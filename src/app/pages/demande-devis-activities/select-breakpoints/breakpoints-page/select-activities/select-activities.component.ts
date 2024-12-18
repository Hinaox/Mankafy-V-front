import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import Location from '../../../../../models/Location';
import Activity from '../../../../../models/Activity';
import { ActivityService } from '../../../../../services/activity.service';
import { AuthService } from '../../../../../services/Auth/auth.service';

@Component({
  selector: 'app-select-activities',
  templateUrl: './select-activities.component.html',
  styleUrl: './select-activities.component.scss',
  standalone: false,
})
export class SelectActivitiesComponent implements OnChanges {
  @Input() selectedBreakpoint?: Location;

  activities?: Activity[];

  selectedActivities: Activity[] = [];

  uniq_id = new Date().getTime();

  constructor(
    private activityService: ActivityService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBreakpoint']) {
      this.setSelectedBreakpoint(changes['selectedBreakpoint'].currentValue);
    }
  }

  async loadActivities() {
    try {
      if (!this.selectedBreakpoint?.id)
        throw 'undefined component.selectedBreakpoint.id';
      this.activities = await this.activityService.findActivitiesByLocation(
        this.selectedBreakpoint.id
      );
      this.activities.forEach((element) => {
        const img = element.image ? element.image : 'default_activity.jpg';
        const imgPath = this.authService.baseUrl(
          '/assets/images/activity_covers/' + img
        );
        element.imagePath = imgPath;
      });
      console.log('activities', this.activities);
    } catch (error) {
      console.error(error);
    }
  }

  onSelectActivity(activity: Activity) {
    const index = this.selectedActivities?.findIndex(
      (el) => el.id == activity.id
    );
    if (index >= 0) {
      this.selectedActivities?.splice(index, 1);
      console.log('enlever activité', activity);
    } else {
      this.selectedActivities.push(activity);
      console.log("ajout d'une activité", activity);
    }
  }

  setSelectedBreakpoint(data?: Location) {
    this.selectedBreakpoint = data;
  }

  scrollToReprendreRoute() {
    const id = 'reprendreRoute' + this.uniq_id;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('undefined document element ' + id);
    }
  }

  activityChecked(activity: Activity): boolean {
    if (this.selectedActivities?.some((el) => el.id == activity.id)) {
      return true;
    }
    return false;
  }

  @Output() handleValider = new EventEmitter<Activity[]>();
  onValiderActivities() {
    this.handleValider.emit(this.selectedActivities);
  }
}
