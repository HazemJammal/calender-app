import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GoogleAuthService } from './google-auth.service';
import { map, Observable } from 'rxjs';
import { CalendarEvent } from '../models/event';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {



  token:string = ""
  constructor(private http:HttpClient, private googleAuth:GoogleAuthService) { 
    this.token = this.googleAuth.getStoredToken() || "";
  }

  // path: /calendars/calendarId/events

  getCalenderEvents(): Observable<CalendarEvent[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    const now = new Date('2024-12-09');
    const timeMin = new Date(now.setHours(0, 0, 0, 0)).toISOString(); // Start of the day
    const timeMax = new Date(now.setDate(now.getDate() + 5)).toISOString();

    const parms = new HttpParams()
      .set('timeMin', timeMin)
      .set('timeMax', timeMax)
      .set('singleEvents', 'true')
      .set('orderBy', 'startTime');
    
    // return this.http.get(`${this.url}/calendars/${calendarId}/events`, { headers });
    return this.http.get<any>("https://www.googleapis.com/calendar/v3/calendars/primary/events/",{headers,params:parms})
      .pipe(
        map((data:any)=>{
          return data.items.map((item:any)=>{
            const startDate = new Date(item.start.dateTime || item.start.date)
            const endDate = new Date(item.end.dateTime || item.end.date)

            return{
              day: startDate,
              title:item.summary || 'No title',
              time:`${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`,
            } as CalendarEvent;
          });
        })
      )

    
  }
}
