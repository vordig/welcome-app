import {Component, HostBinding, input} from '@angular/core';
import {IIssue} from '../../interfaces/issue.interface';
import {IssuePriority} from '../../enums/issue-priority.enum';

@Component({
    selector: 'app-issue',
    imports: [],
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.scss'],
    host: {
        class: 'app-issue'
    }
})
export class IssueComponent {

    public readonly issue = input.required<IIssue>();

    @HostBinding('class') get class() {
        switch (this.issue().priority) {
            case IssuePriority.Minor:
                return 'app-issue--minor';
            case IssuePriority.Normal:
                return 'app-issue--normal';
            case IssuePriority.Major:
                return 'app-issue--major';
            case IssuePriority.Critical:
                return 'app-issue--critical';
            default:
                return '';
        }
    }

}
