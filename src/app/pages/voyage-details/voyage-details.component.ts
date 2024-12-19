import { Component,OnInit  } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
@Component({
  selector: 'app-voyage-details',
  standalone: false,
  
  templateUrl: './voyage-details.component.html',
  styleUrl: './voyage-details.component.scss'
})
export class VoyageDetailsComponent implements OnInit {
  // Tableau des activités
  activities = [
    { name: "Activité 1", status: "done" },  // Activité terminée
    { name: "Activité en cours", status: "in-progress" },  // Activité en cours
    { name: "Activité à venir", status: "upcoming" },  // Activité à venir
  ];
  lat: number= 0.0000000;
  long: number= 0.0000000;
  // Propriété pour la progression (en pourcentage)
  progress: number = 60;
  private geolocationInterval: any;

  constructor(private readonly geolocation: GeolocationService) { }
  getPosition() {
        this.geolocation.subscribe(position =>{ 
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
        });
    }
  ngOnInit(): void {
    // Ici vous pouvez appeler la fonction pour mettre à jour la progression
    this.updateProgress(this.progress);
    // Démarrer la mise à jour de la position toutes les secondes
    this.geolocationInterval = setInterval(() => {
      this.getPosition();
    }, 100); // Mise à jour toutes les 1000 ms (1 seconde)
  }

  // Fonction pour mettre à jour la barre de progression
  updateProgress(percentage: number) {
    const progressElement = document.querySelector('.progress') as HTMLElement;
    if (progressElement) {
      progressElement.style.width = `${percentage}%`;
    }
  }

}
