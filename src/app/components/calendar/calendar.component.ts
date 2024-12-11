import { Component } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import * as Hammer from 'hammerjs';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  
  days = this.getNextFiveDays();
  times = [
    '01:00 AM',
    '02:00 AM',
    '03:00 AM',
    '04:00 AM',
    '05:00 AM',
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
    '11:00 PM',
  ];
  events: any = {
    12: [
      { title: 'Finalize Layouts', time: '08:00 AM - 11:00 AM', startTime: '08:00', endTime: '11:00', description: 'Layouts discussion' },
    ],
    // Add events for other dates here
  };
  selectedEvent: any = null;

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
    const slotHeight = 60; // Adjust based on your slot height in CSS
    return `${index * slotHeight}px`;
  }

  getEventPosition(startTime: string): string {
    const [hour, minute] = startTime.split(':').map(Number);
    return `${(hour - 8) * 60 + minute}px`; // Adjust top position based on time
  }

  getEventHeight(startTime: string, endTime: string): string {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    return `${(endHour - startHour) * 60 + (endMinute - startMinute)}px`; // Adjust height based on duration
  }

  openEventDetails(event: any) {
    this.selectedEvent = event;
  }

  closeEventDetails() {
    this.selectedEvent = null;
  }

  confirmTask() {
    alert('Task Confirmed!');
    this.closeEventDetails();
  }
}
