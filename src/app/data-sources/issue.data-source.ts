import {computed, inject, Signal} from '@angular/core';
import {IssueService} from '../services/issue.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {IIssue} from '../interfaces/issue.interface';

export class IssueDataSource {

    private readonly _issueService = inject(IssueService);

    private readonly _projectId: Signal<string>;

    private readonly _issuesResource = rxResource({
        request: () => ({
            projectId: this._projectId()
        }),
        loader: ({request}) => this._issueService.getIssues(request.projectId)
    });

    public readonly issues = computed<IIssue[]>(() => {
        return this._issuesResource.value() ?? [];
    });

    public readonly isLoading = computed<boolean>(() => {
        return this._issuesResource.isLoading();
    });

    constructor(projectId: Signal<string>) {
        this._projectId = projectId;
    }
}
