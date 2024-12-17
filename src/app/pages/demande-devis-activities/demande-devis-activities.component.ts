import { Component, OnInit } from '@angular/core';
import PlanningClient from '../../models/PlanningClient';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-demande-devis-activities',
  templateUrl: './demande-devis-activities.component.html',
  styleUrl: './demande-devis-activities.component.scss',
})
export class DemandeDevisActivitiesComponent implements OnInit {
  planningClient?: PlanningClient;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.chargerPlanningClient();
  }

  private chargerPlanningClient() {
    try {
      const data: PlanningClient =
        this.localStorageService.retrieve('devisEnCours');
      if (!data) throw 'devisEnCours indéfini';
      if (!data.location) throw 'undefined devisEnCours.location';
      this.setPlanningClient(data);
    } catch (error) {
      console.error(error);
      this.router.navigate(['/demande-devis']);
    }
  }

  private setPlanningClient(data?: PlanningClient) {
    this.planningClient = data;
  }

  onCancel() {
    delete this.planningClient?.location;
    this.router.navigate(['/demande-devis']);
  }
}
