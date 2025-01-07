import { Component, OnInit, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeAsideComponent } from "../home-aside/home-aside.component";
import { GoogleAccountApiService } from '../../services/google-account-api.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { CalendarComponent } from "../calendar/calendar.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HomeAsideComponent, HomeNavComponent, CalendarComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [],
})
export class HomeComponent implements OnInit   {

  showSideNav = false;
  menuHidden = false;
  
  userInfo = signal<any>("")

  constructor(private googleAccountService:GoogleAccountApiService, private googleAuthService:GoogleAuthService ){}


  ngOnInit(): void {
    this.googleAccountService.getUserInfo().subscribe((userInfo) => {
      this.userInfo.set(userInfo); // Update the signal

      console.log(userInfo)
    });
  }

  logout(){
    this.googleAuthService.clearToken()
  }

  readonly panelOpenState = signal(false);

  isActionsVisible = false; // State to track visibility of actions

  toggleActions(): void {
    this.isActionsVisible = !this.isActionsVisible; // Toggle visibility
  }

  toggleSideNav() :void{
    this.showSideNav = !this.showSideNav;
    this.menuHidden = !this.menuHidden
  }

  

}




  