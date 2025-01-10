import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GoogleAuthService } from './google-auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GoogleAccountApiService {
  token:string = ""
  constructor(private http:HttpClient, private googleAuth:GoogleAuthService) { 
    this.token = this.googleAuth.getStoredToken() || "";
  }
  private userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
  getUserInfo(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get<User>(this.userInfoUrl, { headers }).pipe(
      map((res:any) => {
        console.log(res)
        return {
          id: res.id,
          email: res.email,
          firstname: res.given_name,
          lastname: res.family_name,
          picture: res.picture
        }
      } )
    );
  }




}
