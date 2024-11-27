import ActivityType from './ActivityType';

export default class Activity {
  constructor(
    public id?: number,
    public name?: string,
    public locationId?: number,
    public location?: Location,
    public point_x?: number,
    public point_y?: number,
    public duration?: number,
    public minDuration?: number,
    public openingTime?: string,
    public closingTime?: string,
    public link?: string,
    public description?: string,
    public image?: string,
    public activityTypeId?: number,
    public activityType?: ActivityType,
    public imagePath?: string
  ) {}
}
