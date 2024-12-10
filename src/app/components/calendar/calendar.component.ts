import { Component } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  days = this.getNextFiveDays();
  times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'];
  events: any = {
    10: [
      { title: 'Call with John', time: '08:00 AM', startTime: '08:00', endTime: '08:30', description: 'Discuss project' },
      { title: 'Make final layout improvements', time: '08:30 AM - 01:00 PM', startTime: '08:30', endTime: '13:00', description: 'Finalize layouts' },
    ],
    // Add other events for dates
  };
  selectedEvent: any = null;

  getNextFiveDays() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.getDate(),
        day: date.toLocaleString('en-US', { weekday: 'short' }),
      });
    }
    return days;
  }

  getEventPosition(startTime: string) {
    const [hour, minute] = startTime.split(':').map(Number);
    return `${(hour - 8) * 60 + minute}px`; // Adjust top position based on time
  }

  getEventHeight(startTime: string, endTime: string) {
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