import { Component, effect, OnInit, signal, ViewChild} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeAsideComponent } from "../home-aside/home-aside.component";
import { GoogleAccountApiService } from '../../services/google-account-api.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { ModalComponent } from "../modal/modal.component";
import { ModalService } from '../../services/modal.service';


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
  modalOpen  = signal(false);

  constructor(private googleAccountService:GoogleAccountApiService, private googleAuthService:GoogleAuthService, public modalService: ModalService){
    
  }
  ngOnInit(): void {
    this.modalOpen.set(this.modalService.isModalOpen());
  }
  logout(){
    this.googleAuthService.clearToken()
  }
  toggleSideNav() :void{
    this.showSideNav = !this.showSideNav;
    this.menuHidden = !this.menuHidden
  }



}




  