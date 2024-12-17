import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-activity-type',
    templateUrl: './create-activity-type.component.html',
    styleUrl: './create-activity-type.component.scss',
    standalone: false
})
export class CreateActivityTypeComponent {
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      name: ['', [Validators.required]],
    });
  }
}
