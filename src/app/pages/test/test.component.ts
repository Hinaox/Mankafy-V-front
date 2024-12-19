import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import PlanningClient from '../../models/PlanningClient';
import RouteDigraph from '../../models/RouteDigraph';
import Location from '../../models/Location';
import { LocationService } from '../../services/location.service';
import { RouteFetch } from '../../models/Route';
import Activity from '../../models/Activity';
import { ActivityService } from '../../services/activity.service';
import { MatTooltip } from '@angular/material/tooltip';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ActivitySheetComponent } from '../../components/activity-sheet/activity-sheet.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',

  standalone: false,
})
export class TestComponent {}
