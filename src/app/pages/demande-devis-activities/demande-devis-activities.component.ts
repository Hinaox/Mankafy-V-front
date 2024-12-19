import { Component, OnInit } from '@angular/core';
import PlanningClient from '../../models/PlanningClient';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import Activity from '../../models/Activity';
import { ActivityService } from '../../services/activity.service';
import { PlanningClientUtilsService } from '../../utils/planning-client-utils.service';

@Component({
  selector: 'app-demande-devis-activities',
  templateUrl: './demande-devis-activities.component.html',
  styleUrl: './demande-devis-activities.component.scss',
  standalone: false,
})
export class DemandeDevisActivitiesComponent implements OnInit {
  planningClient?: PlanningClient;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private planningUtils: PlanningClientUtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.chargerPlanningClient();
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

  // test
  hotel: Activity = {
    id: 4,
    name: 'Vohitsoa Hotel',
    locationId: 25,
    point_x: -19.828250901678235,
    point_y: 47.05786392820906,
    activityTypeId: 2,
    activityType: {
      id: 2,
      name: 'breakPoint',
    },
  };
  activities: Activity[] = [
    {
      id: 8,
      name: 'Lac Tritriva',
      locationId: 25,
      point_x: -19.92627462262636,
      point_y: 46.92620382256605,
      duration: 18000,
      minDuration: 3600,
      openingTime: '07:00:00',
      closingTime: '17:00:00',
      image: 'lac_tritriva.jpg',
      activityTypeId: 3,
      activityType: {
        id: 3,
        name: 'activity',
      },
    },
    {
      id: 13,
      name: 'Gare Antsirabe',
      locationId: 25,
      point_x: -19.8648196591904,
      point_y: 47.03830944449652,
      duration: 3600,
      minDuration: 600,
      image: 'antsirabe_gare.jpg',
      activityTypeId: 3,
      activityType: {
        id: 3,
        name: 'activity',
      },
    },
  ];

  hotel2: Activity = {
    id: 3,
    name: 'Zomatel Hotel',
    locationId: 27,
    point_x: -21.454675601563398,
    point_y: 47.08687592556993,
    activityTypeId: 2,
    activityType: {
      id: 2,
      name: 'breakPoint',
    },
  };

  activities2: Activity[] = [
    {
      id: 9,
      name: 'Parc national de Ranomafana',
      locationId: 27,
      point_x: -21.264081077246797,
      point_y: 47.41930242542761,
      duration: 14400,
      minDuration: 7200,
      openingTime: '07:00:00',
      closingTime: '17:00:00',
      image: 'parc_national_ranomafana.jpg',
      activityTypeId: 3,
      activityType: {
        id: 3,
        name: 'activity',
      },
    },
  ];

  async testAddBreakpoint() {
    if (this.planningClient) {
      const planning: PlanningClient = JSON.parse(
        JSON.stringify(this.planningClient)
      );

      await this.planningUtils.addBreakpointActivities(
        planning,
        this.hotel,
        this.activities
      );

      await this.planningUtils.addBreakpointActivities(
        planning,
        this.hotel2,
        this.activities2
      );
    }
  }
}
