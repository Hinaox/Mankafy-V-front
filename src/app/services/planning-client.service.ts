import { Injectable } from '@angular/core';
import PlanningClient from '../models/PlanningClient';

@Injectable({
  providedIn: 'root',
})
export class PlanningClientService {
  constructor() {}

  public getNextActivityDate(planningClient: PlanningClient): Date | null {
    if (planningClient.planningClientActivities?.length) {
      const pActivities = planningClient.planningClientActivities;
      const latest = pActivities.reduce((recent, p) => {
        if (p.dateFin && recent.dateFin && recent.dateFin > p.dateFin) {
          return recent;
        }
        return p;
      });
      if (latest.dateFin) {
        return new Date(latest.dateFin);
      }
    }

    return null;
  }
}
