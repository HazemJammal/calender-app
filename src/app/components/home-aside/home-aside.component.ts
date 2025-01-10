import { Component, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { GoogleAccountApiService } from '../../services/google-account-api.service';

@Component({
  selector: 'app-home-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-aside.component.html',
  styleUrl: './home-aside.component.scss',

  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HomeAsideComponent  {
  showActions = true;
  showFavourites = true;
  userInfo = signal<User>({id: '', email: '', firstname: '',lastname:'', picture: ''});
  
  constructor(private googleAccountService:GoogleAccountApiService){}

  ngOnInit(): void {
    this.googleAccountService.getUserInfo().subscribe((userInfo) => {
      this.userInfo.set(userInfo); // Update the signal
      console.log(userInfo)
    });
  }

  toggleActions() : void{
    this.showActions = !this.showActions;
    
  }
  toggleFavourites() : void{
    this.showFavourites = !this.showFavourites;
  }

}
