import { Component,OnInit  } from '@angular/core';

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

  // Propriété pour la progression (en pourcentage)
  progress: number = 60;

  constructor() { }

  ngOnInit(): void {
    // Ici vous pouvez appeler la fonction pour mettre à jour la progression
    this.updateProgress(this.progress);
  }

  // Fonction pour mettre à jour la barre de progression
  updateProgress(percentage: number) {
    const progressElement = document.querySelector('.progress') as HTMLElement;
    if (progressElement) {
      progressElement.style.width = `${percentage}%`;
    }
  }

}
