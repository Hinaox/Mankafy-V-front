import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: false
})
export class ModalComponent implements AfterViewInit {
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
