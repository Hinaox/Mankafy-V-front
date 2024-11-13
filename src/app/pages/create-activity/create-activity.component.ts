import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss',
})
export class CreateActivityComponent {
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      locationId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      minDuration: [''],
      openingHours: [''],
      closingHours: [''],
      link: [''],
      description: [''],
      activityTypeId: ['', [Validators.required]],
    });
  }
}
