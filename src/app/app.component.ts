import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProjectsComponent} from './layout/projects/projects.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProjectsComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'welcome-app';
}
