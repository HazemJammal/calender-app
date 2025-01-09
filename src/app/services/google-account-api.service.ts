import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GoogleAuthService } from './google-auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GoogleAccountApiService {
  token:string = ""
  constructor(private http:HttpClient, private googleAuth:GoogleAuthService) { 
    this.token = this.googleAuth.getStoredToken() || "";
  }
  private userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
  getUserInfo(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get<User>(this.userInfoUrl, { headers }).pipe(
      map((res:User) => res)
    );
  }

  getCalendars(): Observable<any> {
    const url = "https://www.googleapis.com/calendar/v3/calendars/th/events/eventId"
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      calendarId: 'primary',
      orderBy: 'startTime',
      timeMin: '2024-12-10T00:00:00Z',
      timeMax: '2024-12-20T23:59:59Z',
    });
    return this.http.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', { headers });
  }
  


}
