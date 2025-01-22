import {Component, HostBinding, input} from '@angular/core';
import {IIssue} from '../../interfaces/issue.interface';
import {IssuePriority} from '../../enums/issue-priority.enum';

@Component({
  selector: 'app-issue',
  imports: [],
  templateUrl: './issue.component.html',
  host: {
    class: 'issue'
  }
})
export class IssueComponent {

  public readonly issue = input.required<IIssue>();

  @HostBinding('class') get class() {
    switch (this.issue().priority) {
      case IssuePriority.Minor: return 'issue--minor';
      case IssuePriority.Normal: return 'issue--normal';
      case IssuePriority.Major: return 'issue--major';
      case IssuePriority.Critical: return 'issue--critical';
      default: return '';
    }
  }

}
