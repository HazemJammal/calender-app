import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GoogleAuthService } from './google-auth.service';
import { map, Observable, switchMap } from 'rxjs';
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
    const now = new Date();
    const timeMin = new Date(now.setHours(0, 0, 0, 0)).toISOString(); // Start of the day
    const timeMax = new Date(now.setDate(now.getDate() + 5)).toISOString();

    const params = new HttpParams()
      .set('timeMin', timeMin)
      .set('timeMax', timeMax)
      .set('singleEvents', 'true')
      .set('orderBy', 'startTime');
    
    // return this.http.get(`${this.url}/calendars/${calendarId}/events`, { headers });
return this.http
    .get<any>('https://www.googleapis.com/calendar/v3/calendars/primary/events', { headers, params })
    .pipe(
      // First, map the events from the primary endpoint
      map((data: any) => data.items),
      switchMap((items: any[]) =>
        // Fetch colors from the colors endpoint
        this.http
          .get<any>('https://www.googleapis.com/calendar/v3/colors', { headers })
          .pipe(
            map((colorsResponse) => {
              const colorMap = colorsResponse.event; // Mapping of colorId to hex values
              return items.map((item: any) => {
                const startDate = new Date(item.start.dateTime || item.start.date);
                const endDate = new Date(item.end.dateTime || item.end.date);

                // Resolve the background color based on colorId
                const colorId = item.colorId;
                const backgroundColor = colorId ? colorMap[colorId]?.background || '#fbdcd4' : '#fbdcd4';

                return {
                  day: startDate,
                  startTime: startDate,
                  endTime: endDate,
                  backgroundColor: backgroundColor,
                  title: item.summary || 'No title',
                  time: `${startDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })} - ${endDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}`,
                } as CalendarEvent;
              });
            })
          )
      )
    );

    
  }
}
