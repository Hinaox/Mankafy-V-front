import { Component, OnInit } from '@angular/core';
import PlanningClient from '../../models/PlanningClient';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-demande-devis',
    templateUrl: './demande-devis.component.html',
    styleUrl: './demande-devis.component.scss',
    standalone: false
})
export class DemandeDevisComponent implements OnInit {
  // the pages
  readonly DATE_PEOPLE_PAGE = 'selectDatePeople';
  readonly DESTINATION_PAGE = 'chooseDestination';
  readonly BREAKPOINT_PAGE = 'chooseBreakPoint';
  readonly ACTIVITY_PAGE = 'selectActivities';

  page = 'selectDatePeople';

  devisEnCours?: PlanningClient;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  setPage(page: string) {
    this.page = page;
  }

  ngOnInit(): void {
    // charger le demande en cours
    // charger dans le local storage
    const localDevis = this.localStorageService.retrieve('devisEnCours');
    if (localDevis) {
      this.setDevisEnCours(localDevis);
    }
  }

  setDevisEnCours(data?: PlanningClient) {
    this.devisEnCours = data;
    this.saveToLocalStorage();
    // set the page relative to the data
    if (
      data?.dateDepart &&
      data.dateRetour &&
      data.peopleNumber &&
      data.peopleNumber > 0
    ) {
      this.setPage(this.DESTINATION_PAGE);
      if (data.location) {
        // si la location déjà été choisi, on redirige le client vers la page des activités
        this.router.navigate(['/demande-devis-activities']);
      }
    }
  }

  saveToLocalStorage() {
    this.localStorageService.store('devisEnCours', this.devisEnCours);
  }
}
