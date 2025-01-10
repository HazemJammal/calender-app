import { Component, OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { GoogleAccountApiService } from '../../services/google-account-api.service';
import { CalendarService } from '../../services/calendar.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { CalendarEvent } from '../../models/event';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  groupedByDay:any;
  events: any[] = [];
  constructor(private calendarService: CalendarService, private googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    this.calendarService.getCalenderEvents().subscribe((data) => {
      this.events = data;
      console.log(this.events)
      this.groupEvents(this.events);
      console.log(this.groupedByDay)
    });
  }
  days = this.getNextFiveDays();
  times = [
    '01 AM',
    '02 AM',
    '03 AM',
    '04 AM',
    '05 AM',
    '06 AM',
    '07 AM',
    '08 AM',
    '09 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '01 PM',
    '02 PM',
    '03 PM',
    '04 PM',
    '05 PM',
    '05 PM',
    '06 PM',
    '07 PM',
    '08 PM',
    '09 PM',
    '10 PM',
    '11 PM',
    '12 PM',
];



  selectedEvent: any = null;
  slotHeight = window.innerHeight * 0.2;
  eventHeight = window.innerHeight * 0.2
  // Adjust based on your slot height in CSS
  groupEvents(events: CalendarEvent[]) {
    this.groupedByDay = this.events.reduce((acc, event) => {
    const eventDate = new Date(event.day);
    const dayNumber = eventDate.getUTCDate(); // Extract day number (9, 10, 11, etc.)

    if (!acc[dayNumber]) {
        acc[dayNumber] = [];
    }
    acc[dayNumber].push(event);

    return acc;
}, {});
  }
  
  getNextFiveDays() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.getDate(),
        day: date.toLocaleString('en-US', { weekday: 'short' }),
      });
    }
    return days;
  }

  

  getTimeLinePosition(index: number): string {
    return `${(index * this.slotHeight) + 16}px`;
  }

  getTimeLinePosition2(index: number): string {
    return `${(index * this.slotHeight) + 83}px`;
  }

  getEventPosition(startTime: string): string {
    const [hour, minute] = startTime.split(':').map(Number);

    return `${(hour - 0.92 ) * this.eventHeight + (minute *3)}px`; // Adjust top position based on time
  }

  getEventHeight(startTime: string, endTime: string): string {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    return `${(endHour - startHour  - 0.05) * this.eventHeight +((endMinute - startMinute) *2.1)}px`; // Adjust height based on duration
  }
}
