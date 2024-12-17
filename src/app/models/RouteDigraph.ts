import Location from './Location';

export default class RouteDigraph {
  constructor(
    public id?: number,
    public name?: string,
    public locationId?: number,
    public location?: Location,
    public children?: RouteDigraph[],
    public inTheLead?: Boolean,
    public parentLocationId?: number
  ) {}
}
