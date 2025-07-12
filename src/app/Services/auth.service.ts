import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiurl ='http://192.168.0.117:5000/Server/api/Auth/';// 'https://localhost:44312/api/Auth/';

  authnticatio(endpoint: any, payload: any): Observable<any> {
    const api = this.apiurl + endpoint;


    return this.http.post<any>(api, payload).pipe(
      tap(response => {
        if (endpoint == 'Login'||endpoint == 'SocialLogin') {
          localStorage.setItem('AuthToken', response.token);
          localStorage.setItem('UserName', response.userName);
          localStorage.setItem('UserRole', response.roles);
        }
      })
    );
  }
  // signIn(providerId: string): Promise<SocialUser> {
  //   return this.socialAuthService.signIn(providerId);
  // }
  getClientLocation() {
    return fetch("https://cors-anywhere.herokuapp.com/https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => ({
        ip: data.ip,
        city: data.city,
        country_name: data.country_name
      }))
      .catch(() => ({
        ip: 'Unavailable',
        city: 'Unavailable',
        country_name: 'Unavailable'
      }));
  }

  getToken(): string | null {
    return localStorage.getItem('AuthToken');
  }

  getActiveUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiurl}GetUsers`);
  }


  getProfile() {
    return this.http.get(`${this.apiurl}GetProfile`);
  }


  getSystemLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiurl}Getsystemlogs`);
  }

  getRole(): string | null {
    return localStorage.getItem('UserRole');
  }

  logout() {
    debugger;
    return this.http.post(`${this.apiurl}Logout`, null);
  }
  getActivesession() {
    return this.http.get<any[]>(`${this.apiurl}GetActiveSessions`);
  }
}
