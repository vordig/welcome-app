import {Component} from '@angular/core';
import {ListItemComponent} from '../list-item/list-item.component';
import {IListItem} from '../list-item/list-item';

@Component({
  selector: 'app-list-container',
  imports: [
    ListItemComponent
  ],
  templateUrl: './list-container.component.html',
  host: {
    'class': 'list-container',
  }
})
export class ListContainerComponent {
  public listItems: Array<IListItem> = [
    {
      avatar: "A",
      headline: "Headline 42",
      supportingText: "Supporting text"
    },
    {
      avatar: "B",
      headline: "Headline 42",
      supportingText: "Supporting text"
    },
    {
      avatar: "C",
      headline: "Headline 42",
      supportingText: "Supporting text"
    }
  ];

  public addElement() {
    let item: IListItem = {
      avatar: "1",
      headline: "New element",
      supportingText: "Supporting text"
    };
    this.listItems.push(item);
  }

  public changeFirstElement() {
    let firstItem = this.listItems[0];
    firstItem.avatar = "3";
  }
}
