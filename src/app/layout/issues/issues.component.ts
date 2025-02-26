import {Component, effect} from '@angular/core';
import {IssueDataSource} from '../../data-sources/issue.data-source';
import {IssueComponent} from '../../components/issue/issue.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {FormControl, FormGroup} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {IssueState} from '../../types/issue.types';
import {IIssueFilterRequest} from '../../interfaces/requests/project/issue-filter-request';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-issues',
    imports: [
        IssueComponent,
        MatProgressSpinner,
        MatButton
    ],
    templateUrl: './issues.component.html',
    styleUrl: './issues.component.scss'
})
export class IssuesComponent {

    public readonly dataSource = new IssueDataSource();

    public filterForm: FormGroup = new FormGroup({
        searchTerm: new FormControl<string>(""),
        state: new FormControl<IssueState>(this.dataSource.filterRequest().state!),
    });

    private readonly filterRequest =
        toSignal<IIssueFilterRequest>(this.filterForm.valueChanges.pipe(debounceTime(300)));

    constructor() {
        effect(() => {
            if (!this.filterRequest()) return;
            this.dataSource.changeFilter(this.filterRequest()!);
        });
    }

    public changeState(state: IssueState) {
        this.filterForm.controls['state'].setValue(state);
    }
}
