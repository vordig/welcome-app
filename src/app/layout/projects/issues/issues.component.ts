import {Component, Input} from '@angular/core';
import {IssueDataSource} from '../../../data-sources/issue.data-source';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-issues',
  imports: [
    AsyncPipe
  ],
  templateUrl: './issues.component.html'
})
export class IssuesComponent {

  public dataSource = new IssueDataSource();

  @Input()
  set projectId(projectId: string) {
    this.dataSource.projectId.set(projectId);
  }

}
