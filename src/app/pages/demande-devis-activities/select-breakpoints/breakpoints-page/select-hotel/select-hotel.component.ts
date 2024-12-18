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
  selector: 'app-select-hotel',
  templateUrl: './select-hotel.component.html',
  styleUrl: './select-hotel.component.scss',
  standalone: false,
})
export class SelectHotelComponent implements OnChanges {
  @Input() selectedBreakpoint?: Location;
  @Output() handleAnnuler = new EventEmitter<void>();
  @Output() handleChoice = new EventEmitter<Activity>();

  hotels?: Activity[];

  constructor(
    private activityService: ActivityService,
    public authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBreakpoint']) {
      this.setSelectedBreakpoint(changes['selectedBreakpoint'].currentValue);
    }
  }

  setSelectedBreakpoint(data?: Location) {
    this.selectedBreakpoint = data;
    this.loadHotels();
  }

  onAnnuler() {
    this.handleAnnuler.emit();
  }

  async loadHotels() {
    try {
      if (!this.selectedBreakpoint?.id)
        throw 'undefined component.selectedBreakpoint.id';
      this.hotels = await this.activityService.findBreakPointsByLocation(
        this.selectedBreakpoint.id
      );
      this.hotels.forEach((element) => {
        const img = element.image ? element.image : 'default_breakpoint.jpg';
        element.imagePath = this.authService.baseUrl(
          '/assets/images/hotels/' + img
        );
      });
      console.log('hotels', this.hotels);
    } catch (error) {
      console.error(error);
    }
  }

  onHotelSelection(hotel: Activity) {
    this.handleChoice.emit(hotel);
  }
}
