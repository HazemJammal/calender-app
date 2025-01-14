import { Component,HostListener,OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
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
    this.selectedTimeTo.set(this.timesFrom[index+4]);
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
  showModalDp = true;
  closeModal(): void {
  }
}
