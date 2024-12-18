import { Component } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})
export class HomeComponent {
  cities?: { name: string; image: string }[];

  constructor(private authService: AuthService) {
    this.cities = [
      {
        name: 'Toliara',
        image: this.authService.baseUrl('/assets/images/location/toliara.jpg'),
      },
      {
        name: 'Antsirabe',
        image: this.authService.baseUrl(
          '/assets/images/location/antsirabe.jpg'
        ),
      },
      {
        name: 'Fianarantsoa',
        image: this.authService.baseUrl(
          '/assets/images/location/fianarantsoa.webp'
        ),
      },
      {
        name: 'Tolagnaro',
        image: this.authService.baseUrl(
          '/assets/images/location/tolagnaro.jpg'
        ),
      },
      {
        name: 'Morondava',
        image: this.authService.baseUrl(
          '/assets/images/location/morondava.jpg'
        ),
      },
    ];
  }
}
