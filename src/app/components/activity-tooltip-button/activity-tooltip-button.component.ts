import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import Activity from '../../models/Activity';
import { ActivityService } from '../../services/activity.service';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ActivitySheetComponent } from '../activity-sheet/activity-sheet.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-activity-tooltip-button',
  standalone: false,

  templateUrl: './activity-tooltip-button.component.html',
  styleUrl: './activity-tooltip-button.component.scss',
})
export class ActivityTooltipButtonComponent implements OnInit {
  activities?: Activity[];

  constructor(
    private activityService: ActivityService,
    private overlay: Overlay,
    private elementRef: ElementRef,
    private positionBuilder: OverlayPositionBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.activities = await this.activityService.findAllByLocation(8);
  }

  @Input('appCustomTooltip') tooltipTitle: string = '';

  private overlayRef: OverlayRef | null = null;

  @HostListener('mouseenter')
  show() {
    if (this.overlayRef) {
      return;
    }

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 0,
        },
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -10,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
    });

    const tooltipPortal = new ComponentPortal(ActivitySheetComponent);
    const tooltipRef = this.overlayRef.attach(tooltipPortal);

    // Passer les données dynamiques
    if (this.activities?.length)
      tooltipRef.instance.activity = this.activities[0];
  }

  @HostListener('mouseleave', ['$event'])
  hide(event: MouseEvent) {
    if (!this.overlayRef) {
      return;
    }

    // Vérifier si la souris quitte complètement l'élément et le tooltip
    const tooltipElement = this.overlayRef.overlayElement;
    if (
      !this.elementRef.nativeElement.contains(event.relatedTarget) &&
      !tooltipElement.contains(event.relatedTarget as Node)
    ) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
