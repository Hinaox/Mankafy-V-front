import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Injectable({
  providedIn: 'root',
})
@Pipe({
    name: 'datePipeFR',
    standalone: false
})
export class DateFRPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {
    // Enregistrez les données de localisation pour le français
    registerLocaleData(localeFr);
  }

  transform(value?: Date): string | null {
    try {
      if (!value) {
        throw 'date null';
      }
      // Formatez la date avec le jour de la semaine, le mois en français et l'heure
      return this.datePipe.transform(value, 'dd/MM/yyyy', '', 'fr');
    } catch (error) {
      return 'Invalid Date';
    }
  }
}
