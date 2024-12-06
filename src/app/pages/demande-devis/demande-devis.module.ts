import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeDevisComponent } from './demande-devis.component';
import { AppModule } from '../../app.module';
import { ChooseDestinationComponent } from './choose-destination/choose-destination.component';
import { SelectBreakPointComponent } from './select-break-point/select-break-point.component';
import { SelectDatePeopleComponent } from './select-date-people/select-date-people.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinationMapComponent } from './destination-map/destination-map.component';
import { BreakpointMapComponent } from './breakpoint-map/breakpoint-map.component';
import { SideMenuBreakPointComponent } from './side-menu-break-point/side-menu-break-point.component';
import { SelectActivitiesComponent } from './select-activities/select-activities.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivityMapComponent } from './activity-map/activity-map.component';
import { ActivitySuggestionViewComponent } from './select-activities/activity-suggestion-view/activity-suggestion-view.component';
import { CalendrierComponent } from './calendrier/calendrier.component';

@NgModule({
  declarations: [
    DemandeDevisComponent,
    ChooseDestinationComponent,
    SelectBreakPointComponent,
    SelectDatePeopleComponent,
    DestinationMapComponent,
    BreakpointMapComponent,
    SideMenuBreakPointComponent,
    SelectActivitiesComponent,
    ActivityMapComponent,
    ActivitySuggestionViewComponent,
    CalendrierComponent,
  ],
  imports: [
    CommonModule,
    AppModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,
  ],
})
export class DemandeDevisModule {}
