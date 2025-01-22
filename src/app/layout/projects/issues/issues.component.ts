import {Component, Input} from '@angular/core';
import {IssueDataSource} from '../../../data-sources/issue.data-source';
import {AsyncPipe} from '@angular/common';
import {IssueComponent} from '../../../components/issue/issue.component';

@Component({
  selector: 'app-issues',
  imports: [
    AsyncPipe,
    IssueComponent
  ],
  templateUrl: './issues.component.html',
  host: {
    'class': 'issue-list'
  }
})
export class IssuesComponent {

  public dataSource = new IssueDataSource();

  @Input()
  set projectId(projectId: string) {
    this.dataSource.projectId.set(projectId);
  }

}
