import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PayementService } from '../../services/payement/payement.service';
import { AuthService } from '../../services/Auth/auth.service';
import PayementInfo from '../../models/PayementInfo';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent {
  selectedPayment: string | null = null;
  payementTypeInfo!: PayementInfo;
  constructor(
    private http: HttpClient,
    private payementService: PayementService,
    private authService: AuthService,
  ){};

  // Méthode appelée lorsque l'utilisateur sélectionne une option de paiement
  async selectPayment(method: string): Promise<void> {
    this.selectedPayment = method;
    try {
      // Récupération des informations de paiement de manière asynchrone
      this.payementTypeInfo = await this.payementService.getPaymentType(method);
      // Les données sont disponibles après la résolution de la promesse
      console.log(`payement Info id: ${this.payementTypeInfo.id} name: ${this.payementTypeInfo.name}`);
    } catch (error) {// Gestion des erreurs
      console.error(`Erreur lors de la récupération des informations de paiement :`, error);
    }
    console.log(`Payment method selected: ${method}`);
  }

  
  // Méthode pour réinitialiser le mode de paiement (facultatif)
  resetPayment(): void {
    this.selectedPayment = null;
  }
  // Méthode appelée lorsque l'utilisateur confirme le paiement
  confirmPayment(): void {
    if (this.selectedPayment) {
      console.log(`Payment confirmed with: ${this.selectedPayment}`);
      // Ajoutez ici la logique pour traiter le paiement
      // Par exemple, vous pouvez envoyer la méthode sélectionnée au backend
    } else {
      console.log('No payment method selected');
    }
  }
}
