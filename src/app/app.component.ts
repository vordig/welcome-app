import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ListContainerComponent} from './list-container/list-container.component';
import {TasksComponent} from './layout/tasks/tasks.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ListContainerComponent,
    TasksComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'welcome-app';
}
