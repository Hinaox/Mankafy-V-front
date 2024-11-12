import { Component } from '@angular/core';

@Component({
  selector: 'app-demande-devis',
  templateUrl: './demande-devis.component.html',
  styleUrl: './demande-devis.component.scss',
})
export class DemandeDevisComponent {
  page = 'selectDatePeople';

  setPage(page: string) {
    this.page = page;
  }
}
