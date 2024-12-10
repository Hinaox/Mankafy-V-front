import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import Activity from '../../../../models/Activity';
import { AuthService } from '../../../../services/Auth/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

declare const bootstrap: any;

@Component({
  selector: 'app-activity-suggestion-view',
  templateUrl: './activity-suggestion-view.component.html',
  styleUrl: './activity-suggestion-view.component.scss',
})
export class ActivitySuggestionViewComponent implements OnChanges {
  @Output() handleConfirm = new EventEmitter<Activity>();

  @Input() checked = false;
  @Input() activity?: {
    activity: Activity;
    distance: number;
    duration: number;
  };
  imageSrc: string | null = null;
  distance = 0;
  name = '';

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity']) {
      this.setActivity(changes['activity'].currentValue);
    }
  }

  setActivity(data?: {
    activity: Activity;
    distance: number;
    duration: number;
  }) {
    this.activity = data;
    this.name = this.activity?.activity.name ? this.activity.activity.name : '';
    const img = this.activity?.activity.image
      ? this.activity.activity.image
      : 'default_activity.jpg';
    this.imageSrc = this.authService.baseUrl(
      '/assets/images/activity_covers/' + img
    );
    this.distance = this.activity?.distance ? this.activity.distance / 1000 : 0;
  }
}
