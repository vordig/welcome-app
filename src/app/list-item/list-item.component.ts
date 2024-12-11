import {Component, input} from '@angular/core';
import {IListItem} from './list-item';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  host: {
    "class": "list-item",
  }
})
export class ListItemComponent {
  data = input<IListItem>();
}
