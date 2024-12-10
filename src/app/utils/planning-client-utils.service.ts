import { Injectable } from '@angular/core';
import PlanningClient from '../models/PlanningClient';
import Activity from '../models/Activity';
import PlanningClientActivity from '../models/PlanningClientActivity';
import { MapService } from '../services/map.service';
import { ActivityService } from '../services/activity.service';

@Injectable({
  providedIn: 'root',
})
export class PlanningClientUtilsService {
  constructor(
    private mapService: MapService,
    private activityService: ActivityService
  ) {}

  async addActivityIntoPlanningClient(
    planningClient: PlanningClient,
    activity: Activity
  ) {
    if (!planningClient.dateDepart) {
      throw 'Undefined planningClient.dateDepart';
    }
    if (!activity.id) {
      throw 'undefined activity.id';
    }
    const nearActivity = await this.getNearActivity(planningClient, activity);

    const routeDistanceDuration =
      await this.activityService.getDistanceDuration(
        activity.id,
        nearActivity?.activity?.id ? nearActivity.activity.id : null
      );
    const routeDuration = routeDistanceDuration.duration;
    if (!routeDuration) {
      throw `undefined duration between activity (${activity.id}) and nearActivity (${nearActivity?.activity?.id})`;
    }
    var dateDebut = null;
    var dateFin = null;
    const duration = activity.duration;
    if (!duration) {
      throw 'Undefined activity duration';
    }
    // si départ de Tanà
    if (!nearActivity) {
      dateDebut = new Date(planningClient.dateDepart);

      // mettre le temps à 6 heures
      dateDebut.setHours(6, 0, 0);
      console.log(`Je quitte Tanà à ${dateDebut}`);
      const date20h = new Date(dateDebut);
      date20h.setHours(20);
      var tempsTrajetRestant = routeDuration * 1000;
      console.log(`${tempsTrajetRestant / 3600000}h de trajet`);
      tempsTrajetRestant += duration * 1000;
      // 10 h de trajet /j
      const maxDuration = 10 * 3600 * 1000;
      const jourAjouter = Math.floor(tempsTrajetRestant / maxDuration);
      const tempsAjouter = tempsTrajetRestant % maxDuration;
      dateDebut.setDate(dateDebut.getDate() + jourAjouter);
      dateDebut.setHours(7);
      dateDebut.setTime(dateDebut.getTime() + tempsAjouter - duration * 1000);
      // vérification de l'heure d'ouverture
      var openingTime = 8;
      if (activity.openingTime) {
        try {
          openingTime = parseInt(activity.openingTime.split(':')[0]);
        } catch (error) {
          console.error('untraitable activity.openingTime');
        }
      }
      if (dateDebut.getHours() < openingTime) {
        dateDebut.setHours(openingTime);
      }
      console.log(`et j'arrive à ${activity.name} à ${dateDebut}`);
    }
    // si départ de nearactivity
    else if (nearActivity) {
      if (!nearActivity.dateFin) {
        throw `Undefined date fin for planningClientActivity (activityId = ${nearActivity.activity?.id})`;
      }
      // dateDébut à la fin de la précédente activité
      dateDebut = new Date(nearActivity.dateFin);
      console.log(
        `je quitte ${nearActivity.activity?.name} à ${nearActivity.dateFin}`
      );

      var tempsTrajetRestant = routeDuration * 1000;
      console.log(tempsTrajetRestant / 3600000 + 'h de trajet');
      tempsTrajetRestant += duration * 1000;

      // 10 h de trajet /j
      const maxDuration = 10 * 3600 * 1000;
      // reste de trajet du jour
      const date17h = new Date(dateDebut);
      date17h.setHours(17);
      const reste = date17h.getTime() - dateDebut.getTime();
      tempsTrajetRestant += maxDuration - reste;
      // départ à 7h de base
      dateDebut.setHours(7);
      const jourAjouter = Math.floor(tempsTrajetRestant / maxDuration);
      const tempsAjouter = tempsTrajetRestant % maxDuration;
      dateDebut.setDate(dateDebut.getDate() + jourAjouter);
      dateDebut.setTime(dateDebut.getTime() + tempsAjouter - duration * 1000);
      // vérification de l'heure d'ouverture
      var openingTime = 8;
      if (activity.openingTime) {
        try {
          openingTime = parseInt(activity.openingTime.split(':')[0]);
        } catch (error) {
          console.error('untraitable activity.openingTime');
        }
      }
      if (dateDebut.getHours() < openingTime) {
        dateDebut.setHours(openingTime);
      }
      console.log(`et j'arrive à ${activity.name} à ${dateDebut}`);
    }
    if (dateDebut == null) {
      throw 'dateDebut ne peut pass être nulle';
    }
    // calcul de la dateFin
    dateFin = new Date(dateDebut);
    dateFin.setTime(dateFin.getTime() + duration * 1000);
    // vérification de l'heure d'ouverture de l'activité
    const closingTime = activity.closingTime;
    if (closingTime) {
      const closingDate = new Date(dateDebut);
      const timeSplit = closingTime.split(':');
      if (timeSplit[0]) {
        const hours = parseInt(timeSplit[0]);
        var minutes = 0;
        var seconds = 0;
        if (timeSplit[1]) {
          minutes = parseInt(timeSplit[1]);
        }
        if (timeSplit[2]) {
          seconds = parseInt(timeSplit[2]);
        }
        closingDate.setHours(hours, minutes, seconds);
        if (dateFin > closingDate) {
          // réduire au durée de visite minimale
          const minDuration = activity.minDuration;
          var remettreADemain = false;
          if (minDuration) {
            dateFin.setTime(dateDebut.getTime() + minDuration * 1000);
            if (dateFin > closingDate) {
              remettreADemain = true;
            }
          } else {
            remettreADemain = true;
          }
          if (remettreADemain) {
            // ne pas prendre en compte la distance à partir de l'hotel
            // mais seulement la distance de l'autre activité en prenant en compte que
            // le trajet a pris une pause à 20h et a repris à 7h
            // du coup..
            const date20h = new Date(dateDebut);
            date20h.setHours(20);
            var tempsTrajetRestant =
              routeDuration * 1000 -
              (date20h.getTime() - dateDebut.getTime()) +
              duration * 1000; // ms
            const maxDuration = (20 - 7) * 3600 * 1000;
            const jourAjouter = Math.floor(tempsTrajetRestant / maxDuration);
            const tempsAjouter = tempsTrajetRestant % maxDuration;
            console.log('tempsAjouter', tempsAjouter);

            dateDebut.setDate(dateDebut.getDate() + jourAjouter);
            dateDebut.setHours(7);
            dateDebut.setTime(dateDebut.getTime() + tempsAjouter);
            dateFin.setTime(dateDebut.getTime() + duration * 1000);
          }
        }
      }
    }

    // ajouter le planning
    if (!planningClient.planningClientActivities) {
      planningClient.planningClientActivities = [];
    }
    planningClient.planningClientActivities.push({
      activity,
      dateDebut,
      dateFin,
    });
  }

  async getNearActivity(
    planningClient: PlanningClient,
    activity: Activity
  ): Promise<PlanningClientActivity | null> {
    let retour: PlanningClientActivity | null = null;
    if (planningClient.planningClientActivities?.length) {
      let minDistance: number | null = null;
      for (let element of planningClient.planningClientActivities) {
        if (element.activity?.id && activity.id) {
          const distanceDuration =
            await this.activityService.getDistanceDuration(
              activity.id,
              element.activity.id
            );
          const distance = distanceDuration.distance;
          if (!distance) {
            console.error(
              `Undefined distance between activity${activity.id} and activity${element.activity.id}`
            );
            continue;
          }
          if (minDistance == null || distance < minDistance) {
            minDistance = distance;
            retour = element;
          }
        }
      }
    }
    return retour;
  }
}
