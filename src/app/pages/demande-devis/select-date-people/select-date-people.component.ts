import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  dateFieldsStrictlyGreaterThanOtherValidator,
  strictlyPositiveNumberValidator,
} from '../../../utils/FormValidator';
import PlanningClient from '../../../models/PlanningClient';

@Component({
  selector: 'app-select-date-people',
  templateUrl: './select-date-people.component.html',
  styleUrl: './select-date-people.component.scss',
})
export class SelectDatePeopleComponent implements OnChanges {
  @Output() handlePageChange = new EventEmitter<string>();
  @Input() devisEnCours?: PlanningClient;
  @Output() handleChange = new EventEmitter<PlanningClient>();

  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group(
      {
        peopleNumber: [
          1,
          [Validators.required, strictlyPositiveNumberValidator()],
        ],
        dateDepart: ['', [Validators.required]],
        dateRetour: ['', [Validators.required]],
      },
      {
        validators: [
          dateFieldsStrictlyGreaterThanOtherValidator(
            'dateDepart',
            'dateRetour'
          ),
        ],
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devisEnCours']) {
      this.setDevisEnCours(changes['devisEnCours'].currentValue);
    }
  }

  onSubmitForm() {
    const valid = true;
    if (valid) {
      if (!this.devisEnCours) {
        this.devisEnCours = {};
      }

      const peopleNumber = this.peopleNumber?.value;
      const dateDepart = new Date(this.dateDepart?.value);
      dateDepart.setHours(6, 0, 0);
      const dateRetour = new Date(this.dateRetour?.value);
      dateRetour.setHours(6, 0, 0);

      this.devisEnCours.peopleNumber = peopleNumber;
      this.devisEnCours.dateDepart = dateDepart;
      this.devisEnCours.dateRetour = dateRetour;

      this.handleChange.emit(this.devisEnCours);
    }
  }

  increasePeopleNumber() {
    const value = this.peopleNumber?.value;
    if (value != undefined) {
      this.peopleNumber?.setValue(value + 1);
    }
  }

  decreasePeopleNumber() {
    const value = this.peopleNumber?.value;
    if (value != undefined && value > 1) {
      this.peopleNumber?.setValue(value - 1);
    }
  }

  setDevisEnCours(data?: PlanningClient) {
    this.devisEnCours = data;

    if (data?.peopleNumber) {
      this.peopleNumber?.setValue(data.peopleNumber);
    }
    if (data?.dateDepart) {
      this.dateDepart?.setValue(data.dateDepart);
    }
    if (data?.dateRetour) {
      this.dateRetour?.setValue(data.dateRetour);
    }
  }

  get peopleNumber() {
    return this.myForm.get('peopleNumber');
  }
  get dateDepart() {
    return this.myForm.get('dateDepart');
  }
  get dateRetour() {
    return this.myForm.get('dateRetour');
  }
}
