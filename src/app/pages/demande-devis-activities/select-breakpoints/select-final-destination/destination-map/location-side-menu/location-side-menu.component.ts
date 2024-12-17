import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import Location from '../../../../../../models/Location';

@Component({
  selector: 'app-location-side-menu',
  templateUrl: './location-side-menu.component.html',
  styleUrl: './location-side-menu.component.scss',
})
export class LocationSideMenuComponent implements OnChanges {
  @Input() selectedLocation?: Location;
  @Output() handleAnnuler = new EventEmitter<void>();
  @Output() handleChoice = new EventEmitter<void>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedLocation']) {
      this.setSelectedLocation(changes['selectedLocation'].currentValue);
    }
  }

  setSelectedLocation(data?: Location) {
    this.selectedLocation = data;
  }

  onAnnuler() {
    this.handleAnnuler.emit();
  }

  onChoice() {
    this.handleChoice.emit();
  }
}
