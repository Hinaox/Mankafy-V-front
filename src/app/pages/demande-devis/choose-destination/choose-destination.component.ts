import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-choose-destination',
  templateUrl: './choose-destination.component.html',
  styleUrl: './choose-destination.component.scss',
})
export class ChooseDestinationComponent {
  @Output() handlePageChange = new EventEmitter<string>();

  // données temporaire
  destinations = ['sud', 'ouest', 'nord', 'est'];

  onChooseDestination() {
    const valid = true;

    if (valid) {
      this.handlePageChange.emit('chooseBreakPoint');
    }
  }
}
