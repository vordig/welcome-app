import {Component, computed, effect, ElementRef, HostBinding, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {IssueDataSource} from '../../data-sources/issue.data-source';
import {IssueComponent} from '../../components/issue/issue.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {IssuePriority, IssueState} from '../../types/issue.types';
import {IIssueFilterRequest} from '../../interfaces/requests/project/issue-filter-request';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipListboxChange, MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {ProjectsSelectionComponent} from '../../components/projects-selection/projects-selection.component';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {PrioritiesSelectionComponent} from '../../components/priority-selection/priorities-selection.component';
import {MatDialog} from '@angular/material/dialog';
import {IssueCreateComponent} from '../../components/dialogs/issue-create/issue-create.component';
import {IssueSortingComponent} from '../../components/issue-sorting/issue-sorting.component';
import {CdkDrag, CdkDragEnd, CdkDragMove, CdkDragStart, DragRef, Point} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-issues',
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
        IssueSortingComponent,
        CdkDrag
    ],
    templateUrl: './issues.component.html',
    styleUrl: './issues.component.scss'
})
export class IssuesComponent implements OnInit, OnDestroy {

    private readonly _host = inject(ElementRef);

    @HostBinding('style.--app-list-panel-size') get listPanelSizeVariable() {
        return this.listPanelSize() + 'px';
    }

    @HostBinding('class.enable-animation') get enableAnimation() {
        return !this.isDragging();
    }

    @HostBinding('class.single-pane') get singlePane() {
        return this.isListPaneCollapsed() || this.isDetailPaneCollapsed();
    }

    private readonly isDragging = signal<boolean>(false);
    public readonly isListPaneCollapsed = computed<boolean>(() => this.listPanelSize() === 0);
    public readonly isDetailPaneCollapsed = computed<boolean>(() => this.listPanelSize() === this.hostSize());
    private readonly listPanelSize = computed<number>(() => {
        let result = this.adjustedPanelSize() + this.distance();
        return Math.min(Math.max(0, result), this.hostSize());
    });
    private readonly distance = signal<number>(0);
    private readonly panelSize = signal<number>(412);
    private readonly adjustedPanelSize = computed<number>(() => {
        const panelSize = this.panelSize();

        if(panelSize <= 360) return panelSize < 360 / 2 ? 0 : 360;
        if(panelSize <= 412) return panelSize < 360 + (412 - 360) / 2 ? 360 : 412;
        if(panelSize <= this.midPoint()) return panelSize < 412 + (this.midPoint() - 412) / 2 ? 412 : this.midPoint();
        return panelSize < this.midPoint() + (this.hostSize() - this.midPoint()) / 2 ? this.midPoint() : this.hostSize();
    });

    private observer: any;
    private readonly hostSize = signal<number>(0);
    private readonly midPoint = computed<number>(() => Math.round(this.hostSize() / 2));

    constructor() {
        effect(() => {
            console.log(this.hostSize());
        })
    }

    public ngOnInit(): void {
        this.observer = new ResizeObserver(entries => {
            this.hostSize.set(entries[0].contentRect.width);
        })
        this.observer.observe(this._host.nativeElement);
    }

    public ngOnDestroy(): void {
        this.observer.unobserve(this._host.nativeElement);
    }

    public onResizeStarted(event: CdkDragStart) {
        this.isDragging.set(true);
    }

    public onResizeMove(event: CdkDragMove) {
        this.distance.set(event.distance.x);
    }

    public onResizeEnded(event: CdkDragEnd) {
        this.isDragging.set(false);
        this.distance.set(0);
        this.panelSize.set(this.adjustedPanelSize() + event.distance.x);
    }
}
