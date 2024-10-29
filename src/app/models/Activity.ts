export default class Activity {
  constructor(
    public id?: number,
    public name?: string,
    public location?: Location,
    public point_x?: number,
    public point_y?: number,
    public duration?: number,
    public link?: string,
    public description?: string
  ) {}
}
