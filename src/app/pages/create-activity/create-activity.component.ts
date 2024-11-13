import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import Location from '../../models/Location';
import { ActivityTypeService } from '../../services/activity-type.service';
import ActivityType from '../../models/ActivityType';
import { LatLng } from 'leaflet';
import { empty } from '../../utils/utils';

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
    private activityTypeService: ActivityTypeService
  ) {
    this.myForm = fb.group({
      locationId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      minDuration: [''],
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

  onChangeCoords() {
    const lat = this.point_x?.value;
    const lng = this.point_y?.value;

    if (!empty(lat) && !empty(lng))
      this.activityLocationMarker = new LatLng(lat, lng);
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
