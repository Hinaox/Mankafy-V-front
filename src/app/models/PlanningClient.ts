import Location from './Location';
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
    public location?: Location
  ) {}
}
