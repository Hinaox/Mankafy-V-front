import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Récupérer le token depuis le stockage local ou un service
    const token = localStorage.getItem('access_token'); // Remplacez par votre méthode de récupération de token

    // Cloner la requête et ajouter le token dans les en-têtes
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    console.log('Cette requête est interceptée', request.url);

    // Passer la requête modifiée au handler
    return next.handle(request);
  }
}
