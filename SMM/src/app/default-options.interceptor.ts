import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SharedService} from './shared.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DefaultOptionsInterceptor implements HttpInterceptor {
    token: string = this.sharedService.accessToken; // Recupera il token di accesso
    constructor(private sharedService: SharedService) {}
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      // Imposta le opzioni di default per tutte le richieste HTTP
      const httpOptions = {
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.token}`),
        withCredentials: true,
      };
  
      // Applica le opzioni di default alla richiesta originale
      const modifiedRequest = request.clone(httpOptions);
  
      // Prosegui con la richiesta HTTP modificata
      return next.handle(modifiedRequest);
    }
  }
  