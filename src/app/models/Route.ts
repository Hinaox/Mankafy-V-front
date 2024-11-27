class RouteSegmentStep {
  public distance?: number;
  public duration?: number;
  public type?: number;
  public instruction?: string;
  public name?: string;
  public way_points?: number[];
}

class RouteSegment {
  public distance?: number;
  public duration?: number;
  public steps?: RouteSegmentStep[];
}

class RouteDetail {
  public summary?: { distance: number; duration: number };
  public segments?: RouteSegment[];
  public bbox?: number[];
  public geometry?: string;
  public way_points?: number[];
}

class Route {
  public bbox?: number[];
  public routes?: RouteDetail[];
  public metadata?: {
    attribution?: string;
    service?: string;
    timestamp?: number;
    query?: {
      coordinates?: number[][];
      profile?: string;
      format?: string;
      radiuses?: number[];
    };
    engine?: {
      version?: string;
      build_date?: string;
      graph_date?: string;
    };
  };
}

class RouteFetch {
  public route?: Route;
}

export { RouteFetch };
