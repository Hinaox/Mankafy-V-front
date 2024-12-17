import { Component } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
    standalone: false
})
export class GalleryComponent {
  albums = ['', '', ''];

  photos = ['tsitsre', 'tsitsre', 'tsitsre', 'tsitsre', 'tsitsre', 'tsitsre'];
}
