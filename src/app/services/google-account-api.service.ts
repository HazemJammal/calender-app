import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleAuthService } from './google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAccountApiService {
  token:string = ""
  constructor(private http:HttpClient, private googleAuth:GoogleAuthService) { 
    this.token = this.googleAuth.getStoredToken() || "";
  }
  private userInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo';
  getUserInfo(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get(this.userInfoUrl, { headers });
  }


}
