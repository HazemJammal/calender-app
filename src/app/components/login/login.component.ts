import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private googleAuthService:GoogleAuthService,private router:Router, private ref: ChangeDetectorRef){}
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
