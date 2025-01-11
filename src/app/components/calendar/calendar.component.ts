import { Component, OnInit } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { GoogleAccountApiService } from '../../services/google-account-api.service';
import { CalendarService } from '../../services/calendar.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { CalendarEvent } from '../../models/event';
import { connect } from 'rxjs';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  events: any[] = [];
  groupedEvents: { date: number, day: string, events: any[] }[] = [];
  
  constructor(private calendarService: CalendarService, private googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    this.calendarService.getCalenderEvents().subscribe((data) => {
      this.events = data;
      this.groupedEvents  = this.combineData();
      console.log(this.groupedEvents);
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
    '06 PM',
    '07 PM',
    '08 PM',
    '09 PM',
    '10 PM',
    '11 PM',
    '12 PM',
];



  slotHeight = window.innerHeight * 0.15;
  // Adjust based on your slot height in CSS

  
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

  combineData() {
    return this.days.map((dateObj) => {
      const matchingEvents = this.events.filter((event) => {
        const eventDate = new Date(event.day).getDate(); // Extract the day of the month
        return eventDate === dateObj.date;
      });
      return { ...dateObj, events: matchingEvents };
    });
  }

  

  getTimeLinePosition(index: number): string {
    return `${(index * this.slotHeight) + 16}px`;
  }

  getTimeLinePosition2(index: number): string {
    return `${(index * this.slotHeight) + 70}px`;
  }

  getEventPosition(startTime: Date): string {

    const hour = startTime.getHours();
    const minute = startTime.getMinutes();
    
    return `${(hour - 0.95 ) * this.slotHeight + (minute *2.25) +5}px`; // Adjust top position based on time
  }

  getEventHeight(startTime: Date, endTime: Date): string {

    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();    
    const endHour = endTime.getHours();

    const endMinute = endTime.getMinutes();
    return `${(endHour - startHour) * this.slotHeight +((endMinute - startMinute) *15)-10}px`; // Adjust height based on duration
    // Adjust height based on duration
  }
  getDuration(startTime:Date, endTime:Date):string{

    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();    
    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();

    const duration = (endHour - startHour) * 60 + (endMinute - startMinute);
    const newStartMinute = startMinute < 10 ? `0${startMinute}`: startMinute;
    const newEndMinute = startMinute < 10 ? `0${startMinute}`: startMinute;
    
    if(startMinute == 0 && duration == 60){      
      return startHour <= 12 ?`${startHour}:00 AM`: `${startHour-12}:00 PM`;
    }

    else{
      if(startHour <= 12 && endHour < 12){
        return `${startHour}:${newStartMinute} - ${endHour}:${newEndMinute} AM`;
      }
      else if(startHour > 12 && endHour >= 12){
        return `${startHour -12}:${newStartMinute} - ${endHour-12}:${newEndMinute} PM`;
      }
      else{
        return `${startHour}:${newStartMinute} AM - ${endHour-12}:${newEndMinute} PM`;
      }
    }
  }


}
