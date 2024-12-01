import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  authEndPoint="https://accounts.google.com/o/oauth2/v2/auth"
  oAuthConfig = {
    client_id:"739964986936-dbbbi72qsfs9fcbjmu7fufu91onjjroq.apps.googleusercontent.com",
    redirect_uri:"http://localhost:4200",
    response_type:"token",
    scope: "openid https://www.googleapis.com/auth/calendar",
    include_granted_scopes:"true",
    state:"pass-through value"
  }
  constructor() { }

  loginWithGoogle(){
    const queryParams = new URLSearchParams(this.oAuthConfig).toString();
    const authUrl = `${this.authEndPoint}?${queryParams}`;
    window.location.href= authUrl;
  }

  extractAndStoreToken() {
    const hash = window.location.hash; // The URL fragment after redirection
    const params = new URLSearchParams(hash.substring(1)); // Remove the '#' at the start

    const token = params.get("access_token")
    if(token){
      localStorage.setItem("google_access_token",token)
      return true;
    }
    return false;
  }

  getStoredToken(): string | null {
    return localStorage.getItem('google_access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getStoredToken();
  }

  /**
   * Clears the stored token (for logout purposes).
   */
  clearToken(): void {
    localStorage.removeItem('google_access_token');
  }
}
