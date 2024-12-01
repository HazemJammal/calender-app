declare var google: any;

import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import{MatIconModule} from '@angular/material/icon';
import { GoogleAuthService } from '../../services/google-auth.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatGridListModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private googleAuthService:GoogleAuthService,private router:Router){}
  ngOnInit():void {
    if(this.googleAuthService.isLoggedIn()){
      this.router.navigate(['/home'])
    }
    else{
      const extractToken = this.googleAuthService.extractAndStoreToken();
      if(extractToken){
        this.router.navigate(['/home'])
      }
    }
  }

  login(){
    this.googleAuthService.loginWithGoogle();
  }
}
