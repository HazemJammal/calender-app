import { Component, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { GoogleAccountApiService } from '../../services/google-account-api.service';
import { ModalComponent } from "../modal/modal.component";
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home-aside',
  standalone: true,
  imports: [CommonModule, ModalComponent],
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
  active = 'calendar';
  showActions = true;
  showFavourites = true;
  userInfo = signal<User>({id: '', email: '', firstname: '',lastname:'', picture: ''});
  
  constructor(private googleAccountService:GoogleAccountApiService, private modalService: ModalService){}

  ngOnInit(): void {
    console.log('HomeAsideComponent initialized');
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

  openModal() {
    this.modalService.openModal();
    this.active = 'new-event';
  }

}
