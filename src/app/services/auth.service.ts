import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { APP_SERVICE_CONFIG } from '../appConfig/appConfig.service';
import { AppConfig } from '../appConfig/appConfig.interface';
import { ResponseDTO } from './dtos/response.dto';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private COOKIE_NAME = 'op_hp'

  constructor(private cookieService: CookieService, private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<ResponseDTO<string>>(`${this.config.apiEndpoint}/login`, { email: email, password: password })
  }

  signUp(signUpData: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }) {
    return this.http.post<ResponseDTO<string>>(`${this.config.apiEndpoint}/signup`, { ...signUpData })
  }

  logout() {
    this.removeToken()
    this.router.navigateByUrl('/')
  }

  isLoggedIn() {
    return this.getToken() !== ''
  }

  addToken(token: string) {
    this.cookieService.set(this.COOKIE_NAME, token, {
      secure: true
    })
  }

  removeToken() {
    this.cookieService.delete(this.COOKIE_NAME)
  }

  getToken() {
    return this.cookieService.get(this.COOKIE_NAME)
  }

  getUserDetailsFromToken(): { _id: string, firstName: string } {
    const token = this.getToken()
    return jwt_decode(token)
  }
}
