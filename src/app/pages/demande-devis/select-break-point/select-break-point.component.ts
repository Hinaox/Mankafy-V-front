import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import Activity from '../../../models/Activity';
import { ActivityService } from '../../../services/activity.service';
import PlanningClient from '../../../models/PlanningClient';

@Component({
  selector: 'app-select-break-point',
  templateUrl: './select-break-point.component.html',
  styleUrl: './select-break-point.component.scss',
})
export class SelectBreakPointComponent
  implements OnInit, OnChanges, AfterViewInit
{
  breakPoints?: Activity[];

  @Input() devisEnCours?: PlanningClient;
  @Output() handlePageChange = new EventEmitter<string>();
  @Output() handleChange = new EventEmitter<PlanningClient>();

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devisEnCours']) {
      this.setDevisEnCours(changes['devisEnCours'].currentValue);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadBreakPoints();
  }

  async loadBreakPoints() {
    if (this.devisEnCours?.location?.id) {
      try {
        this.breakPoints = await this.activityService.findBreakPointsByLocation(
          this.devisEnCours.location.id
        );
        console.log(this.breakPoints);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('undefined destination');
    }
  }

  setDevisEnCours(data?: PlanningClient) {
    this.devisEnCours = data;
  }

  onRetour() {
    delete this.devisEnCours?.location;
    this.handleChange.emit(this.devisEnCours);
  }
}
