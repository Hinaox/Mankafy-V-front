import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-large',
  templateUrl: './modal-large.component.html',
  styleUrl: './modal-large.component.scss',
})
export class ModalLargeComponent implements AfterViewInit {
  @Input() name = '';
  @Input() header = '';
  @Input() modalDanger: boolean = false;

  ngAfterViewInit(): void {
    var myModalEl = document.getElementById(this.name);
    if (myModalEl) {
      myModalEl.addEventListener('shown.bs.modal', (event) => {
        const element = $('#' + this.name + ' form input');
        if (element[0]) {
          console.log(element[0]);
          element[0].focus();
        }
      });
    }
  }
}
