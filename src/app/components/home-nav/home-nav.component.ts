import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [MatButtonModule,MatToolbarModule,MatIconModule],
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.scss'
})
export class HomeNavComponent {

}
