export default class Location {
  constructor(
    public id?: number,
    public name?: string,
    public point_x?: number,
    public point_y?: number,
    public surface?: string,
    public parent?: Location,
    description?: string
  ) {}
}
