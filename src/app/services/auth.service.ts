import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';

// Change this when you have backend 
const AUTH_API = 'http://localhost:8080/api/auth/';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SESSION_NAME = 'opfa_token'

  constructor(private cookieService: CookieService, private http: HttpClient, @Inject(DOCUMENT) private window: Document) { }

  login(email: string, password: string) {
    this.addToken('logged')
    return true
    // return this.http.post(AUTH_API, {
    //   email,
    //   password
    // })
  }

  signUp(signUpData: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }) {
    // const token = this.http.post(AUTH_API, signUpData)
    this.addToken('logged')
    return true
  }

  logout() {
    this.removeToken()
    this.window.location.reload()
  }

  isLoggedIn() {
    return this.cookieService.get(this.SESSION_NAME) !== ''
  }

  removeToken() {
    this.cookieService.delete(this.SESSION_NAME)
  }

  addToken(token: string) {
    this.cookieService.set(this.SESSION_NAME, token)
  }

  getToken() {
    return this.cookieService.get(this.SESSION_NAME)
  }
}
