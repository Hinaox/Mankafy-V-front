import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PayementService {
  constructor(private authService: AuthService, private http: HttpClient) { }

  // Fonction pour récupérer le type de paiement par nom
  public async getPaymentType(name: string): Promise<any> {
    try {
      const url = this.authService.baseUrl(`/paiement-types/${name}`);
      const data = await this.http.get<any>(url).toPromise();
      console.log(data); // Affichage des données pour débogage
      return data;
    } catch (err) {
      // Gestion d'erreur améliorée avec message détaillé
      console.error('Error details:', err);  // Ajout du log complet de l'erreur
      throw new Error(`Erreur lors de la récupération du type de paiement ${name}: ${err || err}`);
    }
  }
}
