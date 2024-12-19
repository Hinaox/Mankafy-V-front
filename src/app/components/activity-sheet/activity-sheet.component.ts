import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Activity from '../../models/Activity';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-activity-sheet',
  standalone: false,

  templateUrl: './activity-sheet.component.html',
  styleUrl: './activity-sheet.component.scss',
})
export class ActivitySheetComponent implements OnInit, OnChanges {
  @Input() activity?: Activity;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.activity) {
      const img = this.activity.image
        ? this.activity.image
        : 'default_activity.jpg';
      this.activity.imagePath = this.authService.baseUrl(
        '/assets/images/activity_covers/' + img
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity']) {
      this.setActivity(changes['activity'].currentValue);
    }
  }

  setActivity(data?: Activity) {
    this.activity = data;
    if (this.activity) {
      const img = this.activity.image
        ? this.activity.image
        : 'default_activity.jpg';
      this.activity.imagePath = this.authService.baseUrl(
        '/assets/images/activity_covers/' + img
      );
    }
  }
}
