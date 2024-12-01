import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GoogleAuthService } from '../services/google-auth.service';

@Injectable({
  providedIn: 'root', // Ensure it's injectable across the app
})
export class GoogleAuthGuard implements CanActivate {
  constructor(private googleAuthService: GoogleAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.googleAuthService.isLoggedIn()) {
      return true; // Allow access if logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
