import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  host: {
    class: 'app-root'
  }
})
export class AppComponent {
  title = 'welcome-app';
}
