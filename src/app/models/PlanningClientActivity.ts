import Activity from './Activity';
import PlanningClient from './PlanningClient';

export default class PlanningClientActivity {
  constructor(
    public id?: number,
    public planningClient?: PlanningClient,
    public activity?: Activity,
    public dateDebut?: Date,
    public dateFin?: Date
  ) {}
}
