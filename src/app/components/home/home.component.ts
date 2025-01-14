import { Component, OnInit, ViewChild} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeAsideComponent } from "../home-aside/home-aside.component";
import { GoogleAccountApiService } from '../../services/google-account-api.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { ModalComponent } from "../modal/modal.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HomeAsideComponent, HomeNavComponent, CalendarComponent, CommonModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [],
})
export class HomeComponent implements OnInit   {
  showSideNav = false;
  menuHidden = false;

  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private googleAccountService:GoogleAccountApiService, private googleAuthService:GoogleAuthService ){
    
  }
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




  