import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LatLng } from 'leaflet';
import { LoadingService } from '../../services/loading/loading.service';
import Location from '../../models/Location';
import { LocationService } from '../../services/location.service';
import { MessageBoxService } from '../../services/message-box.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrl: './create-location.component.scss',
})
export class CreateLocationComponent {
  myForm: FormGroup;

  currentPolygonCoords?: L.LatLngExpression[];

  drawing = false;

  constructor(
    fb: FormBuilder,
    private loading: LoadingService,
    private locationService: LocationService,
    private messageBox: MessageBoxService
  ) {
    this.myForm = fb.group({
      name: ['', [Validators.required]],
      surface: ['', [Validators.required]],
      description: [''],
    });
  }

  async onSubmitForm() {
    if (this.myForm.valid) {
      const name = this.name?.value;
      const description = this.description?.value;
      const surface = this.surface?.value;

      const body: Location = { name, description, surface };

      this.loading.startLoading();
      try {
        await this.locationService.save(body);
        this.messageBox.success('Enregistrement réussi');

        // réinitialisation
        this.myForm.reset();
        this.startDrawing();
        this.drawing = false;
      } catch (error) {
        console.error(error);
        this.messageBox.danger("Une erreur s'est produite");
      }

      this.loading.stopLoading();
    }
  }

  startDrawing() {
    this.drawing = true;
    this.currentPolygonCoords = [];
    this.surface?.setValue('');
  }

  onClickOnMap(coord: LatLng) {
    this.surface?.setValue('');
    if (this.drawing && this.currentPolygonCoords) {
      this.currentPolygonCoords.push(coord);
      this.polygonStringify();
      this.currentPolygonCoords = JSON.parse(
        JSON.stringify(this.currentPolygonCoords)
      );
    }
  }

  deleteLastPoint() {
    this.surface?.setValue('');
    if (this.currentPolygonCoords) {
      this.currentPolygonCoords.pop();
      this.currentPolygonCoords = JSON.parse(
        JSON.stringify(this.currentPolygonCoords)
      );
    }
  }

  polygonStringify() {
    if (this.currentPolygonCoords?.length) {
      const surfaces: string[] = [];
      this.currentPolygonCoords.forEach((el: any) => {
        surfaces.push(`[${el.lat}, ${el.lng}]`);
      });
      const surfacesStr = surfaces.join(',');
      this.surface?.setValue(surfacesStr);
    }
  }

  get name() {
    return this.myForm.get('name');
  }

  get description() {
    return this.myForm.get('description');
  }

  get surface() {
    return this.myForm.get('surface');
  }
}
