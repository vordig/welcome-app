import {Component, signal} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {ButtonSelectArrowComponent} from '../button-select-arrow/button-select-arrow.component';
import {ProjectDataSource} from '../../data-sources/project.data-source';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

@Component({
    selector: 'app-projects-selection',
    imports: [
        MatMenuModule,
        MatButton,
        ButtonSelectArrowComponent,
        MatIconModule,
        MatChipsModule
    ],
    templateUrl: './projects-selection.component.html',
    styleUrl: './projects-selection.component.scss'
})
export class ProjectsSelectionComponent {

    public dataSource = new ProjectDataSource();

    public readonly selectedIds = signal<string[]>([]);

    public isSelected(projectId: string): boolean {
        return this.selectedIds().indexOf(projectId) > -1;
    }

    public onItemClick(projectId: string) {
        this.selectedIds.update(selectedIds => {
            let projectIdIndex = selectedIds.indexOf(projectId);
            if (projectIdIndex >= 0)
                selectedIds.splice(projectIdIndex, 1);
            else
                selectedIds.push(projectId);
            return selectedIds;
        });
    }

}
