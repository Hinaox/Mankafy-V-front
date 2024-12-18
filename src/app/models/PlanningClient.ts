import Activity from './Activity';
import Location from './Location';
import PlanningClientActivity from './PlanningClientActivity';
import User from './User';

export default class PlanningClient {
  constructor(
    public id?: number,
    public user?: User,
    public dateDepart?: Date,
    public dateRetour?: Date,
    public isActive?: boolean,
    public peopleNumber?: number,
    public locationId?: number,
    public location?: Location,
    public planningClientActivities?: PlanningClientActivity[],

    // données non enregistrées
    public finalDestination?: Location,
    public breakpoints?: {
      breakpoint: Activity;
      hotel: Activity;
      date: Date;
    }[],
    public trajets?: { dateDebut: Date; dateFin: Date }[]
  ) {}
}
