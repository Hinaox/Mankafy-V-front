import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Activity from '../../../../models/Activity';
import { AuthService } from '../../../../services/Auth/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-activity-suggestion-view',
  templateUrl: './activity-suggestion-view.component.html',
  styleUrl: './activity-suggestion-view.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          position: 'absolute',
          width: '1000px',
          left: '0',
        })
      ),
      state('closed', style({ position: 'inherit', width: '*' })),
      transition('open<=>closed', [animate('200ms')]),
    ]),
  ],
})
export class ActivitySuggestionViewComponent implements OnChanges {
  @Input() activity?: {
    activity: Activity;
    distance: number;
    duration: number;
  };
  imageSrc: string | null = null;
  distance = 0;

  isOpen = false;

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
    const img = this.activity?.activity.image
      ? this.activity.activity.image
      : 'default_activity.jpg';
    this.imageSrc = this.authService.baseUrl(
      '/assets/images/activity_covers/' + img
    );
    this.distance = this.activity?.distance ? this.activity.distance / 1000 : 0;
  }

  toggleView() {
    this.isOpen = !this.isOpen;
  }
}
