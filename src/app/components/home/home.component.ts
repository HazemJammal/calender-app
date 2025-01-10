import { Component, OnInit, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeAsideComponent } from "../home-aside/home-aside.component";
import { GoogleAccountApiService } from '../../services/google-account-api.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../models/user';


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
  constructor(private googleAccountService:GoogleAccountApiService, private googleAuthService:GoogleAuthService ){}
  ngOnInit(): void {

  }
  logout(){
    this.googleAuthService.clearToken()
  }
  toggleSideNav() :void{
    this.showSideNav = !this.showSideNav;
    this.menuHidden = !this.menuHidden
  }
}




  