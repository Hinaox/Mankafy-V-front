import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeDevisComponent } from './demande-devis.component';
import { AppModule } from '../../app.module';
import { ChooseDestinationComponent } from './choose-destination/choose-destination.component';
import { SelectBreakPointComponent } from './select-break-point/select-break-point.component';

@NgModule({
  declarations: [DemandeDevisComponent, ChooseDestinationComponent, SelectBreakPointComponent],
  imports: [CommonModule, AppModule],
})
export class DemandeDevisModule {}
