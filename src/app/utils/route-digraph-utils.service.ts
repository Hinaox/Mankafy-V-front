import { Injectable } from '@angular/core';
import RouteDigraph from '../models/RouteDigraph';
import Location from '../models/Location';

@Injectable({
  providedIn: 'root',
})
export class RouteDigraphUtilsService {
  constructor() {}

  public findParentTreeInArray(
    target: RouteDigraph,
    listContainer: RouteDigraph[]
  ): RouteDigraph | null {
    for (let container of listContainer) {
      const retour = this.findParentTree(target, container);
      if (retour) {
        return retour;
      }
    }
    return null;
  }

  public findLocationInTree(
    location: Location,
    container: RouteDigraph
  ): RouteDigraph | null {
    if (container.location?.id == location.id) {
      return container;
    }
    if (container.children)
      for (let child of container.children) {
        const found = this.findLocationInTree(location, child);
        if (found != null) {
          return found;
        }
      }
    return null;
  }

  public findParentTree(
    target: RouteDigraph,
    container: RouteDigraph
  ): RouteDigraph | null {
    if (container.id == target.id) {
      const retour = JSON.parse(JSON.stringify(container));
      delete retour.children;
      return retour;
    } else {
      if (container.children) {
        for (let child of container.children) {
          const found = this.findParentTree(target, child);
          if (found) {
            const retour = JSON.parse(JSON.stringify(container));
            retour.children = [JSON.parse(JSON.stringify(found))];
            return retour;
          }
        }
      }
    }

    return null;
  }

  public extractLocations(routeDigraph: RouteDigraph): Location[] {
    const retour: Location[] = [];
    this.extractOneLocation(routeDigraph, retour);
    return retour;
  }

  private extractOneLocation(
    routeDigraph: RouteDigraph,
    container: Location[]
  ) {
    try {
      if (!routeDigraph.location)
        throw `undefined routeDigraph.location (${routeDigraph.id})`;
      container.push(routeDigraph.location);
      if (routeDigraph.children)
        for (let child of routeDigraph.children) {
          this.extractOneLocation(child, container);
        }
    } catch (error) {
      console.error(error);
    }
  }
}
