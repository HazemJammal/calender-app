import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GoogleAuthGuard} from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect default route to Login
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'login' }, 
];
