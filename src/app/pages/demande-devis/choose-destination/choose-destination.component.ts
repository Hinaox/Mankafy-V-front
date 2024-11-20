import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import PlanningClient from '../../../models/PlanningClient';

@Component({
  selector: 'app-choose-destination',
  templateUrl: './choose-destination.component.html',
  styleUrl: './choose-destination.component.scss',
})
export class ChooseDestinationComponent implements OnChanges {
  @Output() handlePageChange = new EventEmitter<string>();
  @Input() devisEnCours?: PlanningClient;

  onChooseDestination() {
    const valid = true;

    if (valid) {
      this.handlePageChange.emit('chooseBreakPoint');
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
}
