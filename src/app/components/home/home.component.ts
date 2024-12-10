import { Component, OnInit, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDrawerMode} from '@angular/material/sidenav';

import { ConfigurableFocusTrapFactory, FocusTrapFactory } from '@angular/cdk/a11y';
import { HomeAsideComponent } from "../home-aside/home-aside.component";
import { GoogleAccountApiService } from '../../services/google-account-api.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { CalendarComponent } from "../calendar/calendar.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatExpansionModule, MatCheckboxModule, MatRadioModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatSidenavModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, HomeAsideComponent, HomeNavComponent, CalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [{provide: FocusTrapFactory, useClass: ConfigurableFocusTrapFactory}],
})
export class HomeComponent implements OnInit   {
  
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

}




  