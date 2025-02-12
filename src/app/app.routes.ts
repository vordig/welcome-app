import {Routes} from '@angular/router';
import {ProjectsComponent} from './layout/projects/projects.component';
import {IssuesComponent} from './layout/projects/issues/issues.component';
import {AddProjectComponent} from './components/add-project/add-project.component';
import {noIssuesGuard} from './guards/no-issues.guard';
import {AddIssueComponent} from './components/add-issue/add-issue.component';

export const routes: Routes = [
    {
        path: '',
        component: ProjectsComponent,
        children: [
            {
                path: 'new',
                component: AddProjectComponent
            },
            {
                path: ':projectId/new',
                component: AddIssueComponent
            },
            {
                path: ':projectId',
                component: IssuesComponent,
                canActivate: [noIssuesGuard]
            }
        ]
    }
];
