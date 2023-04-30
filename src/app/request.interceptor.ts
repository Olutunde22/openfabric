import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      })
    })
    return next.handle(newRequest).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.authService.logout()
      }
      return throwError(() => error)
    }));
  }
}
