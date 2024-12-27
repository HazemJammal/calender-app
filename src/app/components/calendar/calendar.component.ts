import { Component } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import * as Hammer from 'hammerjs';
import { CalendarService } from '../../services/calendar.service';
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
  ];
  events: any = {
    18: [
      { title: 'Finalize Layouts', time: '08:30 AM - 09:30 AM', startTime: '01:00', endTime: '02:45', description: 'Layouts discussion' },
    ],
    13: [
      { title: 'Finalize Layouts', time: '08:00 AM - 11:00 AM', startTime: '08:00', endTime: '11:00', description: 'Layouts discussion' },
    ],
    14: [
      { title: 'Finalize Layouts', time: '10:00 - 09:30 AM', startTime: '09:30', endTime: '10:00', description: 'Layouts discussion' },
    ]

  };
  selectedEvent: any = null;
  slotHeight = window.innerHeight * 0.2; // Adjust based on your slot height in CSS
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
    return `${(index * this.slotHeight) + 96}px`;
  }

  getEventPosition(startTime: string): string {
    const [hour, minute] = startTime.split(':').map(Number);

    return `${(hour - 1) * this.slotHeight + (minute * 2.9)}px`; // Adjust top position based on time
  }

  getEventHeight(startTime: string, endTime: string): string {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    return `${(endHour - startHour) * this.slotHeight +((endMinute - startMinute) *2.9)}px`; // Adjust height based on duration
  }
}
