import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-date-people',
  templateUrl: './select-date-people.component.html',
  styleUrl: './select-date-people.component.scss',
})
export class SelectDatePeopleComponent {
  @Output() handlePageChange = new EventEmitter<string>();

  onSubmitForm() {
    const valid = true;
    if (valid) {
      this.handlePageChange.emit('chooseDestination');
    }
  }
}
