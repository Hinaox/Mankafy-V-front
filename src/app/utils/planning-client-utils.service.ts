import { Injectable } from '@angular/core';
import PlanningClient from '../models/PlanningClient';
import Activity from '../models/Activity';
import PlanningClientActivity from '../models/PlanningClientActivity';
import { MapService } from '../services/map.service';
import { ActivityService } from '../services/activity.service';
import { LatLngExpression } from 'leaflet';
import { empty } from './utils';

@Injectable({
  providedIn: 'root',
})
export class PlanningClientUtilsService {
  constructor(
    private mapService: MapService,
    private activityService: ActivityService
  ) {}

  async addBreakpointActivities(
    planning: PlanningClient,
    hotel: Activity,
    activities: Activity[]
  ) {
    console.log('voici le planning', planning);

    const firstActivitiesLength = activities.length;
    var depart: PlanningClientActivity | null = this.findLastActivity(planning);
    var activityFromDepart: Activity | null = depart?.activity
      ? depart.activity
      : null;
    console.log('activityFromDepart', activityFromDepart);

    await this.sortActivitiesByTotalDuration(activities, activityFromDepart);
    console.log('activités trié', JSON.parse(JSON.stringify(activities)));

    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];
      if (!activity.id) throw 'undefined activity.id';

      var dateFin: Date | null = null;

      var durationToNextActivity = 0;
      if (depart) {
        if (!depart.dateFin) {
          console.error('undefined depart.dateFin', depart);
          throw 'erreur planning, undefined depart.dateFin';
        }
        // calcul de durée : trajet depuis lastActivity + temps de viste
        dateFin = new Date(depart.dateFin);
        dateFin.setTime(
          dateFin.getTime() + (activity.totalDuration || 0) * 1000
        );
        console.log(
          `durée trajet depuis ${depart.activity?.name} et visite de ${activity.name}`,
          (activity.totalDuration || 0) / 3600
        );
      } else {
        // calcul de durée: trajet depuis tanà + temps de visite
        if (!planning.dateDepart) throw 'undefined planning.dateDepart';
        dateFin = new Date(planning.dateDepart);
        dateFin.setHours(7, 0, 0);
        dateFin.setTime(
          dateFin.getTime() + (activity.totalDuration || 0) * 1000
        );
        console.log(
          `durée trajet depuis Tanà et visite de ${activity.name}`,
          (activity.totalDuration || 0) / 3600
        );
      }
      // calcul de durée : trajet vers nextActivity
      var nextActivity: Activity | null = null;
      if (i < activities.length - 1) {
        nextActivity = activities[i + 1];
      } else {
        nextActivity = hotel;
      }
      if (!nextActivity.id) throw 'undefined nextActivity.id';
      const distanceDuration = await this.activityService.getDistanceDuration(
        nextActivity.id,
        activity.id
      );
      durationToNextActivity = distanceDuration.duration;

      if (dateFin == null) throw 'undefined fin';
      const dateDebut = new Date(dateFin);
      if (!activity.duration) {
        console.error('undefined activity.duration', activity.id);
        throw 'undefined activity.duration';
      }
      dateDebut.setTime(dateDebut.getTime() - activity.duration * 1000);
      console.log(`Début de l'activité ${activity.name}`, dateDebut);
      // ajouter l'activité au planning
      var adaptable = await this.activityAdaptable(
        activity,
        dateDebut,
        dateFin,
        planning,
        hotel
      );
      if (adaptable) {
        if (!planning.planningClientActivities) {
          planning.planningClientActivities = [];
        }

        console.log(`Fin de l'activité ${activity.name}`, dateFin);
        const planningClientActivity = {
          activity: activity,
          dateDebut,
          dateFin,
        };
        console.log(planningClientActivity);

        planning.planningClientActivities.push(planningClientActivity);
        activities.splice(i, 1);
        // actualisation du depart
        depart = planningClientActivity;
        activityFromDepart = depart.activity ? depart.activity : null;
        i--;
      } else {
        break;
      }
    }

    if (activities.length > 0) {
      // déterminer l'hotel où héberger
      var nextHotel: Activity | null = hotel;
      // si aucune activité dans la liste n'a été lancée et le dernier n'est pas un hotel, choisir le dernier hotel
      if (
        activities.length == firstActivitiesLength &&
        depart?.activity?.activityType?.name != 'breakPoint'
      ) {
        const lastHotel = this.getLastHotel(planning);
        if (lastHotel) {
          nextHotel = lastHotel;
          console.log('lastHotel', lastHotel);
        }
        // si l'hotel n'existe pas, choisir le prochain hotel
        else {
          nextHotel = hotel;
        }
      }
      if (!nextHotel?.id) throw 'undefined nextHotel.id';
      // ajouter l'hotel
      const lastActivity = this.findLastActivity(planning);
      var dateDebutHotel: Date | null = null;
      if (lastActivity) {
        if (!lastActivity.dateFin) throw 'undefined lastActivity.dateFin';
        dateDebutHotel = new Date(lastActivity.dateFin);
      } else {
        if (!planning.dateDepart) throw 'undefined planning.dateDepart';
        dateDebutHotel = new Date(planning.dateDepart);
        dateDebutHotel.setHours(7, 0, 0);
      }
      const distanceDuration = await this.activityService.getDistanceDuration(
        nextHotel?.id,
        lastActivity?.id ? lastActivity.id : null
      );
      const durationToHotel = distanceDuration.duration;
      dateDebutHotel.setTime(dateDebutHotel.getTime() + durationToHotel * 1000);
      if (dateDebutHotel.getHours() < 18) {
        dateDebutHotel.setHours(18, 0, 0);
      }
      const dateFinHotel = new Date(dateDebutHotel);
      dateFinHotel.setDate(dateFinHotel.getDate() + 1);
      dateFinHotel.setHours(8, 0, 0);
      console.log(`je dors à ${nextHotel.name}`);

      const planingHotel: PlanningClientActivity = {
        activity: nextHotel,
        dateDebut: dateDebutHotel,
        dateFin: dateFinHotel,
      };
      if (!planning.planningClientActivities) {
        planning.planningClientActivities = [];
      }
      planning.planningClientActivities.push(planingHotel);
      // continuer la liste
      this.addBreakpointActivities(planning, hotel, activities);
    }
  }

  getLastHotel(planning: PlanningClient): Activity | null {
    var retour: PlanningClientActivity | null = null;
    var lastDate: Date | null = null;
    if (planning.planningClientActivities) {
      for (let pActivity of planning.planningClientActivities) {
        const dateFin = pActivity.dateFin;
        if (!dateFin) continue;
        if (pActivity.activity?.activityType?.name == 'breakPoint') {
          if (lastDate == null) {
            lastDate = dateFin;
            retour = pActivity;
          } else if (lastDate && lastDate < dateFin) {
            lastDate = dateFin;
            retour = pActivity;
          }
        }
      }
    }

    return retour?.activity ? retour.activity : null;
  }

  async activityAdaptable(
    activity: Activity,
    dateDebut: Date,
    dateFin: Date,
    planning: PlanningClient,
    hotel: Activity
  ) {
    var retour = true;
    const nearHotel = await this.findHotelNearActivity(
      activity,
      planning,
      hotel
    );
    if (!nearHotel?.id) {
      return false;
    }
    if (!activity.id) throw 'undefined activity.id';
    const distanceDuration = await this.activityService.getDistanceDuration(
      activity.id,
      nearHotel.id
    );
    const hotelArrival = new Date(dateFin);
    hotelArrival.setTime(
      hotelArrival.getTime() + distanceDuration.duration * 1000
    );

    const date22h = new Date(dateDebut);
    date22h.setHours(22, 0, 0);
    if (hotelArrival > date22h) {
      retour = false;
    }
    if (activity.closingTime) {
      const closingTimeStr = activity.closingTime;
      const split = closingTimeStr.split(':');
      if (split[0]) {
        const time = parseInt(split[0]);
        const closingDate = new Date(dateDebut);
        closingDate.setHours(time, 0, 0);
        if (dateFin > closingDate) {
          retour = false;
        }
      }
    }
    return retour;
  }

  async findHotelNearActivity(
    activity: Activity,
    planning: PlanningClient,
    hotel: Activity | null = null
  ): Promise<Activity | null> {
    if (!activity.id) throw 'undefined activity.id';
    var retour = hotel;
    var lessDuration: number | null = null;
    if (retour) {
      if (!retour.id) throw 'undefined hotel.id';
      lessDuration = (
        await this.activityService.getDistanceDuration(activity.id, retour.id)
      ).duration;
    }
    if (planning.planningClientActivities) {
      for (let pActivity of planning.planningClientActivities) {
        if (pActivity.activity?.activityType?.name == 'breakPoint') {
          if (!pActivity.activity.id) continue;
          const duration = (
            await this.activityService.getDistanceDuration(
              pActivity.activity.id,
              activity.id
            )
          ).duration;
          if (lessDuration == null) {
            lessDuration = duration;
            retour = pActivity.activity;
          } else if (duration < lessDuration) {
            lessDuration = duration;
            retour = pActivity.activity;
          }
        }
      }
    }
    return retour;
  }

  async sortActivitiesByTotalDuration(
    activities: Activity[],
    lastActivity: Activity | null
  ) {
    console.log('activités à trier', JSON.parse(JSON.stringify(activities)));

    for (let i = 0; i < activities.length; i++) {
      try {
        const activity = activities[i];
        if (!activity.id) throw 'undefined activity.id';
        const distanceDuration = await this.activityService.getDistanceDuration(
          activity.id,
          lastActivity?.id ? lastActivity.id : null
        );
        const routeDuration = distanceDuration.duration;
        if (routeDuration == undefined) throw 'undefined duration';
        const totalDuration = routeDuration + (activity.duration || 0);
        activity.totalDuration = totalDuration;
      } catch (error) {
        console.error(error);
      }
    }
    activities.sort((a, b) => (a.totalDuration || 0) - (b.totalDuration || 0));
  }

  findLastActivity(
    planningClient: PlanningClient
  ): PlanningClientActivity | null {
    var lastDate: Date | null = null;
    var retour: PlanningClientActivity | null = null;
    if (planningClient.planningClientActivities) {
      for (let pActivity of planningClient.planningClientActivities) {
        const dateFin = pActivity.dateFin;
        if (!dateFin) continue;
        if (!lastDate) {
          lastDate = dateFin;
          retour = pActivity;
        } else if (lastDate && lastDate < dateFin) {
          lastDate = dateFin;
          retour = pActivity;
        }
      }
    }
    return retour;
  }

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
