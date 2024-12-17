import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import PlanningClient from '../../models/PlanningClient';
import RouteDigraph from '../../models/RouteDigraph';
import Location from '../../models/Location';
import { LocationService } from '../../services/location.service';
import { RouteFetch } from '../../models/Route';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
    animations: [
        trigger('openClose', [
            state('open', style({
                backgroundColor: 'green',
                height: '200px',
                width: '200px',
            })),
            state('closed', style({ height: '100px', width: '100px', backgroundColor: 'black' })),
            transition('closed <=> open', [animate('0.5s')]),
        ]),
    ],
    standalone: false
})
export class TestComponent implements OnInit {
  planningClient: PlanningClient = {
    peopleNumber: 2,
    dateDepart: new Date('2024-12-23T03:00:00.000Z'),
    dateRetour: new Date('2024-12-29T03:00:00.000Z'),
    location: {
      id: 8,
      name: 'Le Grand Sud',
      point_x: undefined,
      point_y: undefined,
      surface:
        '[-19.48212894532047, 45.83103664477483],[-19.41997316110168, 46.19386457130486],[-19.430334111637887, 46.600671640444595],[-19.254108316440046, 46.95250478132218],[-19.30595917262483, 47.21637963698039],[-19.326694916055445, 47.5352284209007],[-19.51319789966427, 47.810098062211345],[-19.751194318940865, 47.810098062211345],[-19.97851146065698, 47.689155420034645],[-20.267350272759373, 47.71114499133951],[-20.555652403773365, 47.656171063077366],[-20.689322775663346, 47.656171063077366],[-20.925527866647226, 47.480254492638586],[-21.028109978642814, 47.37030663611433],[-21.18185076626611, 47.425280564376436],[-21.4786293099784, 47.45826492133372],[-21.75439787437119, 47.37030663611433],[-21.89718120023509, 47.26035877959006],[-21.999081858361517, 47.315332707852214],[-22.080549718325077, 47.11742656610857],[-22.304343762932216, 47.16140570871823],[-22.558220454844044, 47.22737442263278],[-22.831883254915766, 47.22737442263278],[-22.953335182044675, 47.11742656610857],[-22.963451264973543, 47.05145785219402],[-22.91286328803375, 46.80957256784064],[-23.104996849988808, 46.86454649610276],[-23.29685592396819, 46.91952042436491],[-23.508589226762282, 46.89753085306003],[-23.599228183239397, 46.76559342523093],[-23.609295317664763, 46.545697712182445],[-23.77026416023979, 46.39177071304851],[-23.93103407144254, 46.62266121174943],[-24.06151244228103, 46.77658821088337],[-24.20187936928663, 46.88653606740763],[-24.181836387890975, 46.98548913827946],[-24.00130809253819, 47.10643178045613],[-24.021379342900296, 47.28234835089494],[-24.08157428735658, 47.381301421766764],[-24.492147541216017, 47.30433792219978],[-24.681961205014595, 47.194390065675506],[-24.80169495167004, 47.17240049437067],[-24.94123829939631, 47.09543699480368],[-25.06072125231416, 46.95250478132218],[-25.17014505150313, 46.72161428262125],[-25.180087808990645, 46.545697712182445],[-25.269536098227082, 46.24883849956697],[-25.37877231509495, 45.92998971564666],[-25.54739766360318, 45.6001461460739],[-25.596948323286124, 45.29229214780603],[-25.537485071759043, 45.017422506495386],[-25.35891851754525, 44.74255286518475],[-25.279470734081812, 44.32475101039261],[-25.08062377244484, 44.08286572603928],[-24.841580551445343, 43.906949155600465],[-24.602074737077242, 43.79700129907621],[-24.36210962726063, 43.68705344255198],[-24.101632993396606, 43.61008994298499],[-23.73004055946545, 43.56611080037528],[-23.357385691338713, 43.533126443418],[-22.99379497224218, 43.43417337254618],[-22.760986169250472, 43.335220301674354],[-22.588654394218814, 43.269251587759804],[-22.284013600962453, 43.20328287384529],[-22.009267904493782, 43.269251587759804],[-21.764601405743967, 43.269251587759804],[-21.458181127146055, 43.401189015588905],[-21.39681937408218, 43.54412122907045],[-21.652322721683642, 43.74202737081409],[-21.87679231243837, 43.95092829821019],[-21.80540827417748, 44.18181879691112],[-21.774804211682866, 44.467683223874154],[-21.631899013188953, 44.69857372257508],[-21.263780615837838, 44.68757893692264],[-21.274018646069543, 44.929464221276],[-21.171606338272724, 45.22632343389147],[-20.99734274071184, 45.49019828954969],[-20.792066100825625, 45.765067930860276],[-20.483627529921847, 45.820041859122384],[-20.19519063647449, 45.776062716512726],[-19.906218644480848, 45.776062716512726]',
      description:
        "La région sud de Madagascar est une terre de contrastes spectaculaires, mêlant paysages arides, plages paradisiaques et traditions culturelles riches. Cette partie de l'île est idéale pour les aventuriers, les amoureux de la nature et ceux en quête de découvertes authentiques. Voici un aperçu des trésors qu'offre le sud de Madagascar",
      image: 'exemple.jpg',
    },
  };

  routeDigraph: RouteDigraph = {
    id: 1,
    name: 'Antsirabe',
    locationId: 25,
    inTheLead: true,
    parentLocationId: 8,
    location: {
      id: 25,
      name: 'Antsirabe',
      point_x: -19.86530377401011,
      point_y: 47.03384314712738,
      parentId: 8,
    },
    children: [
      {
        id: 3,
        name: 'Fianarantsoa',
        locationId: 27,
        inTheLead: false,
        location: {
          id: 27,
          name: 'Fianarantsoa',
          point_x: -21.45700933587069,
          point_y: 47.091559398234104,
          parentId: 8,
        },
        children: [
          {
            id: 4,
            name: 'Ranohira',
            locationId: 28,
            inTheLead: false,
            location: {
              id: 28,
              name: 'Ranohira',
              point_x: -22.559140477006547,
              point_y: 45.41428565617413,
              parentId: 8,
            },
            children: [
              {
                id: 6,
                name: 'Toliara',
                locationId: 29,
                inTheLead: false,
                location: {
                  id: 29,
                  name: 'Toliara',
                  point_x: -23.351776840065757,
                  point_y: 43.68843482405892,
                  parentId: 8,
                },
              },
            ],
          },
        ],
      },
    ],
  };

  locations?: { location: Location; route: RouteFetch }[];

  dates?: Date[];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.setUpDates();
    this.setUpLocations();
  }

  setUpDates() {
    if (this.planningClient.dateDepart && this.planningClient.dateRetour) {
      this.dates = [];
      const dateDepart: Date = new Date(
        this.planningClient.dateDepart.toString()
      );
      do {
        this.dates.push(new Date(dateDepart.toString()));
        dateDepart.setDate(dateDepart.getDate() + 1);
      } while (dateDepart < this.planningClient.dateRetour);
      console.log(this.dates);
    }
  }

  setUpLocations() {
    this.locations = [];
    const setUpRouteDigraph = async (
      routeDigraph: RouteDigraph,
      container: { location: Location; route: RouteFetch }[]
    ) => {
      if (routeDigraph.location) {
        try {
          if (!routeDigraph.location.id)
            throw 'undefined routeDigraph.location.id';
          const route = await this.locationService.getRouteBetweenLocations(
            routeDigraph.location.id
          );
          container.push({ route, location: routeDigraph.location });
        } catch (error) {
          console.error(error);
        }

        if (routeDigraph.children) {
          for (let child of routeDigraph.children) {
            setUpRouteDigraph(child, container);
          }
        }
      } else {
        console.error(`undefined routeDigraph.location (${routeDigraph.id})`);
      }
    };
    if (this.routeDigraph) {
      setUpRouteDigraph(this.routeDigraph, this.locations);
    } else {
      console.error('Undefined component.routeDigraph');
    }
  }
}
