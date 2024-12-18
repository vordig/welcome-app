import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ListContainerComponent} from './list-container/list-container.component';
import {NavigationComponent} from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ListContainerComponent,
    NavigationComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'welcome-app';
}
