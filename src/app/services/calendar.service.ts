import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleAuthService } from './google-auth.service';
import { Observable } from 'rxjs';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http:HttpClient, private googleAuth:GoogleAuthService){}
  private url:string = "https://www.googleapis.com/calendar/v3";


  // path: /calendars/calendarId/events

  getEvents(calendarId:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.googleAuth.getStoredToken()}`
    });
    return this.http.get(`${this.url}/calendars/${calendarId}/events`, { headers });
  }
}
