import { Component, Input } from '@angular/core';
import PayementInfo from '../../models/PayementInfo';

@Component({
  selector: 'app-payement-info',
  templateUrl: './payement-info.component.html',
  styleUrl: './payement-info.component.scss'
})
export class PayementInfoComponent {
  @Input() selectedPayment!: string | null;
  @Input() payementTypeInfo!: PayementInfo;
  
}
