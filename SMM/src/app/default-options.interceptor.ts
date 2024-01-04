import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { SharedService } from './services/shared.service';
import { Injectable } from '@angular/core';
import { catchError, throwError, switchMap, map } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { RefreshTokenResponse } from './shared-interfaces';

@Injectable()
export class DefaultOptionsInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private sharedService: SharedService, private http: HttpClient) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpOptions = {
      headers: request.headers.set(
        'Authorization',
        `Bearer ${sessionStorage.getItem('accessToken')}`
      ),
      withCredentials: true,
    };

    return from(this.checkToken(httpOptions)).pipe(
      switchMap(() => {
        const modifiedRequest = request.clone(httpOptions);
        return next.handle(modifiedRequest);
      })
    );
  }

  async checkToken(httpOptions: any) {
    if (
      this.isTokenExpired(sessionStorage.getItem('accessToken')!) &&
      !this.isRefreshing
    ) {
      this.isRefreshing = true;
      await this.refreshToken(httpOptions);
    }
  }

  refreshToken(httpOptions: any): Promise<void> {
    return this.http
      .get<RefreshTokenResponse>('http://localhost:3500/api/refresh/')
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        }),
        map((data) => {
          sessionStorage.setItem('accessToken', data.accessToken);
          httpOptions.headers = httpOptions.headers.set(
            'Authorization',
            `Bearer ${sessionStorage.getItem('accessToken')}`
          );
        }),
        switchMap(() => {
          this.isRefreshing = false;
          return from(Promise.resolve()); // Return a resolved promise to match the return type
        })
      )
      .toPromise();
  }

  isTokenExpired(token: string): boolean {
    try {
      if (!token) {
        return false;
      }

      const tokenData = jwtDecode(token);

      if (!tokenData || !tokenData.exp) {
        return true;
      }

      const currentTime = Math.floor(Date.now() / 1000);

      // se è scaduto ritorna true
      return tokenData.exp < currentTime;
    } catch (error) {
      console.log('Errore in isTokenExpired');
      return true;
    }
  }
}
