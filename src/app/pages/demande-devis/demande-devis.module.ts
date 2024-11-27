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

@NgModule({
  declarations: [
    DemandeDevisComponent,
    ChooseDestinationComponent,
    SelectBreakPointComponent,
    SelectDatePeopleComponent,
    DestinationMapComponent,
    BreakpointMapComponent,
    SideMenuBreakPointComponent,
  ],
  imports: [CommonModule, AppModule, FormsModule, ReactiveFormsModule],
})
export class DemandeDevisModule {}
