import {Component, computed, effect, inject, input, OnInit, resource, signal} from '@angular/core';
import {IssueDataSource} from '../../../data-sources/issue.data-source';
import {AsyncPipe} from '@angular/common';
import {IssueComponent} from '../../../components/issue/issue.component';
import {IssueService} from '../../../services/issue.service';
import {IIssue} from '../../../interfaces/issue.interface';
import {firstValueFrom, of} from 'rxjs';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-issues',
    imports: [
        AsyncPipe,
        IssueComponent,
        MatButton
    ],
    templateUrl: './issues.component.html',
    host: {
        'class': 'issue-list'
    }
})
export class IssuesComponent {

    private readonly _issueService = inject(IssueService);

    public readonly projectId = input.required<string>();

    public readonly issuesResource = resource({
        request: () => ({
            projectId: this.projectId()
        }),
        loader: ({request}) => firstValueFrom(this._issueService.getIssues(request.projectId))
    });

    public readonly statusResource = resource({
        request: () => ({
            firstIssueId: this.issuesResource.value()?.at(0) ?? null
        }),
        loader: ({request}) => {
            console.log('status called');
            if (!request.firstIssueId) return firstValueFrom(of('nope'));
            return firstValueFrom(of('ready'));
        }
    });

    // public readonly issues = signal<IIssue[]>([]);

    public readonly issues = computed<IIssue[]>(() => {
        return this.issuesResource.value() ?? [];
    });

    public readonly issuesCount = computed(() => {
        return this.issuesResource.value()?.length ?? 0;
    });

    public readonly firstStatus = computed(() => {
        return this.statusResource.value() ?? null;
    });

    // public dataSource = new IssueDataSource();

    // constructor() {
    //     effect(() => {
    //         this.loadIssues(this.projectId());
    //     });
    // }
    //
    // private loadIssues(projectId: string): void {
    //     this.issues.set([]);
    //     this._issueService.getIssues(projectId).subscribe({
    //         next: data => this.issues.set(data)
    //     });
    // }

}
