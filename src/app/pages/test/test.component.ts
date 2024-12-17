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
  squares = [''];

  isOpen = false;

  ngOnInit(): void {}
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
