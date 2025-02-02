import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GoogleAuthService } from './google-auth.service';
import { map, Observable, switchMap, BehaviorSubject } from 'rxjs';
import { AddEvent, CalendarEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private eventsSubject = new BehaviorSubject<CalendarEvent[]>([]);
  events$ = this.eventsSubject.asObservable();

  token: string = "";

  constructor(private http: HttpClient, private googleAuth: GoogleAuthService) {
    this.token = this.googleAuth.getStoredToken() || "";
  }

  getCalenderEvents(): Observable<CalendarEvent[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    const now = new Date();
    now.setDate(now.getDate() - 1);
    const timeMin = new Date(now.setHours(0, 0, 0, 0)).toISOString();
    const timeMax = new Date(now.setDate(now.getDate() + 5)).toISOString();

    const params = new HttpParams()
      .set('timeMin', timeMin)
      .set('timeMax', timeMax)
      .set('singleEvents', 'true')
      .set('orderBy', 'startTime');

    return this.http
      .get<any>('https://www.googleapis.com/calendar/v3/calendars/primary/events', { headers, params })
      .pipe(
        map((data: any) => data.items),
        switchMap((items: any[]) =>
          this.http
            .get<any>('https://www.googleapis.com/calendar/v3/colors', { headers })
            .pipe(
              map((colorsResponse) => {
                const colorMap = colorsResponse.event;
                const events = items.map((item: any) => {
                  const startDate = new Date(item.start.dateTime || item.start.date);
                  const endDate = new Date(item.end.dateTime || item.end.date);
                  const colorId = item.colorId;
                  const backgroundColor = colorId ? colorMap[colorId]?.background || '#fbdcd4' : '#fbdcd4';

                  return {
                    day: startDate,
                    startTime: startDate,
                    endTime: endDate,
                    backgroundColor: backgroundColor,
                    summary: item.summary || 'No title',
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
                this.eventsSubject.next(events); // Update the BehaviorSubject with the new events
                return events;
              })
            )
        )
      );
  }

  addEvent(event: AddEvent): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', event, { headers })
      .pipe(
        switchMap(() => this.getCalenderEvents()) // Fetch the updated list of events after adding a new one
      );
  }
}