import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';

@Injectable()
export class DefaultOptionsInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpOptions = {
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.sharedService.accessToken}`),
      withCredentials: true,
    };

    const modifiedRequest = request.clone(httpOptions);

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error?.status == 403) {
          return this.refreshTokenMethod(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  refreshTokenMethod(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.sharedService.refreshToken().pipe(
      switchMap((newAccessToken: string) => {
        // Se hai ottenuto con successo un nuovo token di accesso
        // Aggiorna il token nell'oggetto SharedService
        this.sharedService.accessToken = newAccessToken;

        // Clona la richiesta originale e aggiorna l'intestazione dell'autorizzazione
        const modifiedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        // Riprova la richiesta originale con il nuovo token
        return next.handle(modifiedRequest);
      }),
      catchError((error: HttpErrorResponse) => {
        // Gestisci eventuali errori durante il refresh del token
        // Esempio: logout dell'utente, reindirizzamento alla pagina di login, ecc.
        return throwError(error);
      })
    );
  }
}
