import {Component, computed, effect, inject, signal} from '@angular/core';
import {IssueComponent} from '../../../components/issue/issue.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipListboxChange, MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {ProjectsSelectionComponent} from '../../../components/projects-selection/projects-selection.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {PrioritiesSelectionComponent} from '../../../components/priority-selection/priorities-selection.component';
import {IssueSortingComponent} from '../../../components/issue-sorting/issue-sorting.component';
import {MatDialog} from '@angular/material/dialog';
import {IssueDataSource} from '../../../data-sources/issue.data-source';
import {IssuePriority, IssueState} from '../../../types/issue.types';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {IIssueFilterRequest} from '../../../interfaces/requests/project/issue-filter-request';
import {IssueCreateComponent} from '../../../components/dialogs/issue-create/issue-create.component';

@Component({
  selector: 'app-issue-list',
  imports: [
      IssueComponent,
      MatListModule,
      MatProgressBarModule,
      MatChipsModule,
      MatButtonModule,
      MatMenuModule,
      ProjectsSelectionComponent,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatIcon,
      RouterLink,
      PrioritiesSelectionComponent,
      IssueSortingComponent
  ],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss'
})
export class IssueListComponent {

    private readonly _dialog = inject(MatDialog);

    public readonly dataSource = new IssueDataSource();

    public readonly searchControl = new FormControl<string>(this.dataSource.filterRequest().searchTerm ?? '');
    public readonly selectedState = signal<IssueState>(this.dataSource.filterRequest().state ?? "Open");
    public readonly selectedProjectIds = signal<string[]>(this.dataSource.filterRequest().projectIds ?? []);
    public readonly selectedPriorities = signal<IssuePriority[]>(this.dataSource.filterRequest().priorities ?? []);

    private readonly searchControlChanges = toSignal(this.searchControl.valueChanges.pipe(debounceTime(250)));
    private readonly filterRequest = computed<IIssueFilterRequest>(() => {
        return {
            searchTerm: this.searchControlChanges() ?? '',
            state: this.selectedState(),
            projectIds: this.selectedProjectIds(),
            priorities: this.selectedPriorities(),
        };
    });

    constructor() {
        effect(() => {
            if (!this.filterRequest()) return;
            this.dataSource.changeFilter(this.filterRequest()!);
        });
    }

    public onStateChanged(change: MatChipListboxChange) {
        if (!change.value) return;
        this.selectedState.set(change.value);
    }

    public createIssue() {
        const dialogRef = this._dialog.open(IssueCreateComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return;
            this.dataSource.reload();
        });
    }

}
