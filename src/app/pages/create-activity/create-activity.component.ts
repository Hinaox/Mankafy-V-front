import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import Location from '../../models/Location';
import { ActivityTypeService } from '../../services/activity-type.service';
import ActivityType from '../../models/ActivityType';
import { LatLng } from 'leaflet';
import { empty } from '../../utils/utils';
import { strictlyPositiveNumberValidator } from '../../utils/FormValidator';
import Activity from '../../models/Activity';
import { ActivityService } from '../../services/activity.service';
import { LoadingService } from '../../services/loading/loading.service';
import { MessageBoxService } from '../../services/message-box.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss',
})
export class CreateActivityComponent implements OnInit {
  myForm: FormGroup;

  locations?: Location[];
  activityTypes?: ActivityType[];

  activityLocationMarker?: L.LatLng;

  constructor(
    fb: FormBuilder,
    private locationService: LocationService,
    private activityTypeService: ActivityTypeService,
    private activityService: ActivityService,
    private loading: LoadingService,
    private messageBox: MessageBoxService
  ) {
    this.myForm = fb.group({
      locationId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      duration: ['', [Validators.required, strictlyPositiveNumberValidator()]],
      minDuration: ['', [strictlyPositiveNumberValidator()]],
      openingTime: [''],
      closingTime: [''],
      link: [''],
      description: [''],
      activityTypeId: ['', [Validators.required]],
      point_x: ['', [Validators.required]],
      point_y: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadLocations();
    this.loadActivityTypes();
  }

  async loadLocations() {
    try {
      this.locations = await this.locationService.findAll();
      // set default value
      if (this.locations.length)
        this.locationId?.setValue(this.locations[0].id);
    } catch (error) {
      console.error(error);
    }
  }

  async loadActivityTypes() {
    try {
      this.activityTypes = await this.activityTypeService.findAll();

      if (this.activityTypes) {
        // set default value
        if (this.activityTypes.length)
          this.activityTypeId?.setValue(this.activityTypes[0].id);

        for (let item of this.activityTypes) {
          switch (item.name) {
            case 'restaurant':
              item.nom = 'Restaurant';
              break;
            case 'activity':
              item.nom = 'Activité';
              break;
            case 'breakPoint':
              item.nom = "Point d'arrêt";
              break;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  onClickOnMap(coords: L.LatLng) {
    this.point_x?.setValue(coords.lat);
    this.point_y?.setValue(coords.lng);
  }

  onSelectLocation(location: Location) {
    this.locationId?.setValue(location.id);
  }

  onChangeCoords() {
    const lat = this.point_x?.value;
    const lng = this.point_y?.value;

    if (!empty(lat) && !empty(lng))
      this.activityLocationMarker = new LatLng(lat, lng);
  }

  async onSubmitForm() {
    if (this.myForm.valid) {
      const locationId = this.locationId?.value;
      const name = this.name?.value;
      var duration = this.duration?.value;
      var minDuration = this.minDuration?.value;
      const openingTime = this.openingTime?.value;
      const closingTime = this.closingTime?.value;
      const link = this.link?.value;
      const description = this.description?.value;
      const activityTypeId = this.activityTypeId?.value;
      const point_x = this.point_x?.value;
      const point_y = this.point_y?.value;

      if (!empty(duration)) {
        duration = duration * 60;
      }
      if (!empty(minDuration)) {
        minDuration = minDuration * 60;
      }

      const body: Activity = {
        locationId,
        name,
        duration,
        minDuration,
        openingTime,
        closingTime,
        link,
        description,
        activityTypeId,
        point_x,
        point_y,
      };

      try {
        this.loading.startLoading();
        await this.activityService.save(body);
        this.loading.stopLoading();
        this.messageBox.success('Enregistrement réussi');
        this.myForm.reset();
      } catch (error) {
        console.error(error);
      }
    }
  }

  get locationId() {
    return this.myForm.get('locationId');
  }
  get name() {
    return this.myForm.get('name');
  }
  get duration() {
    return this.myForm.get('duration');
  }
  get minDuration() {
    return this.myForm.get('minDuration');
  }
  get openingTime() {
    return this.myForm.get('openingTime');
  }
  get closingTime() {
    return this.myForm.get('closingTime');
  }
  get link() {
    return this.myForm.get('link');
  }
  get description() {
    return this.myForm.get('description');
  }
  get activityTypeId() {
    return this.myForm.get('activityTypeId');
  }
  get point_x() {
    return this.myForm.get('point_x');
  }
  get point_y() {
    return this.myForm.get('point_y');
  }
}
