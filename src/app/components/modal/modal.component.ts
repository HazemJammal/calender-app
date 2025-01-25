import { Component,HostListener,OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddEvent, CalendarEvent } from '../../models/event';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{
  selectedTimeFrom = signal<string>('');
  selectedTimeTo = signal<string>('');

  dropdownVisibleFrom: boolean = false;
  dropdownVisibleTo:boolean = false;

  timesFrom:string[] = [];
  timesTo:string[] = [];

  eventSummary = new FormControl<string>('');
  eventStartTime = new FormControl('');
  eventEndTime = new FormControl('');
  eventDescription = new FormControl('');



  constructor(private modalService:ModalService, private calendarService: CalendarService) { }

  ngOnInit() {
  this.fillTimeFrom();
  this.currentTime();
  }
  fillTimeFrom() {
    for(let i = 0; i < 24; i++) {
      for(let j = 0; j < 60; j+=15) {
        let hour = i == 0 ? 12 : i;
        let minute = j < 10 ? '0' + j : j;
        if(i < 12) {
          this.timesFrom.push(hour + ':' + minute + 'am');
        }
        else if (i == 12) {
          this.timesFrom.push(hour + ':' + minute + 'pm');
        }
        else{
        hour = i - 12;
        this.timesFrom.push(hour + ':' + minute + 'pm');
        }
      }
    }
  }
  fillTimeTo(time:string) {
    let index = this.timesFrom.indexOf(time);
    this.timesTo = this.timesFrom.slice(index+1);
  }
  
  currentTime(){
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
  
    // Round to the nearest 15 minutes
    minute = Math.round(minute / 15) * 15;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  
    let ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    let minuteString = minute < 10 ? '0' + minute : minute.toString();
  
    this.selectedTimeFrom.set(hour + ':' + minuteString + ampm);
  }


  toggleDropdownFrom(show: boolean): void {

    this.dropdownVisibleFrom = true;
    this.dropdownVisibleTo = false;

  }

  toggleDropdownTo(show: boolean): void {
    this.dropdownVisibleTo = true;
    this.dropdownVisibleFrom = false;

  }

  // Set the selected time when an option is clicked
  selectTime(time: string, index:number): void {

    this.selectedTimeFrom.set(time);
    this.eventStartTime.setValue(this.selectedTimeFrom());
    this.selectedTimeTo.set(this.timesFrom[index+4]);
    this.eventEndTime.setValue(this.selectedTimeTo());
    this.fillTimeTo(time);
    this.dropdownVisibleFrom = false;
  }
  selectTimeTo(time: string): void {

    this.selectedTimeTo.set(time);
    this.dropdownVisibleTo = false;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.custom-select-container');
    if (!clickedInside) {
      this.dropdownVisibleFrom = false; 
      this.dropdownVisibleTo = false;

      // Close dropdown if click is outside the component
    }
  }
  closeModal(): void {
    this.modalService.closeModal();
  }

  openModal(): void {
    this.modalService.openModal();
  }

  convertTo24Hour(time: string): string {
    let hour = parseInt(time.split(':')[0]);
    let minute = time.split(':')[1].slice(0, 2);
    let ampm = time.slice(-2);

    if (ampm === 'am' && hour === 12) {
      hour = 0;
    }
    if (ampm === 'pm' && hour < 12) {
      hour += 12;
    }

    return hour + ':' + minute;
  }
  saveEvent(): void {
    // Convert selected times to 24-hour format
    const eventStart = this.convertTo24Hour(this.selectedTimeFrom());
    const eventEnd = this.convertTo24Hour(this.selectedTimeTo());
  
    const [hoursStart, minutesStart] = eventStart.split(":").map(Number); // Parse start time
    const [hoursEnd, minutesEnd] = eventEnd.split(":").map(Number); // Parse end time
  
    // Create start and end Date objects
    const startTime = new Date();
    startTime.setHours(hoursStart, minutesStart, 0, 0);
  
    const endTime = new Date();
    endTime.setHours(hoursEnd, minutesEnd, 0, 0);
  
    // Validate that the start time is earlier than the end time
    if (startTime >= endTime) {
      console.error("End time must be later than start time.");
      return;
    }
  
    const summary = this.eventSummary.value as string;
    const colorId = '1';
    const description = this.eventDescription.value as string;
  
    // Create event object
    const event: AddEvent = {
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Asia/Riyadh', // Use a valid IANA time zone
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Asia/Riyadh', // Use a valid IANA time zone
      },
      summary,
      colorId,
      description,
    };
  
    // Call the API to add the event
    this.calendarService.addEvent(event).subscribe(
      () => {
        console.log('Event added successfully');
        this.modalService.closeModal();
      },
      (error) => {
        console.error('Error adding event:', error);
      }
    );
  }
  
  
  

}
