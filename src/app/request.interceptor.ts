import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      withCredentials: true,
      headers: new HttpHeaders({
        Authorization: 'Bearer' + this.authService.getToken(),
        'Content-Type': 'application/json',
      })
    })
    return next.handle(newRequest);
  }
}
