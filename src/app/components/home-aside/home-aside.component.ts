import { Component, signal } from '@angular/core';
import { GoogleAccountApiService } from '../../services/google-account-api.service';

import { User } from '../../models/user';
@Component({
  selector: 'app-home-aside',
  standalone: true,
  imports: [],
  templateUrl: './home-aside.component.html',
  styleUrl: './home-aside.component.scss'
})
export class HomeAsideComponent {
  constructor(private googleAccountApi:GoogleAccountApiService) { }
  readonly panelOpenState = signal(false);

  user = signal<User>({picture: '../../../assets/images/Default_pfp.png', name: '', email: '',id:''});
  userInfo: any = null;
  ngOnInit() {
    this.googleAccountApi.getUserInfo().subscribe((data) => {
      // this.userInfo = data;
      // console.log(data);
      
    });
  }

  createNewEvent() {
    // Implement logic to create a new event
  }

  navigateToInbox() {
    // Implement logic to navigate to the inbox view
  }

  navigateToCalendar() {
    // Implement logic to navigate to the calendar view
  }


}
