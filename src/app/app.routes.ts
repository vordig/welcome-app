import {Routes} from '@angular/router';
import {ProjectsComponent} from './layout/projects/projects.component';
import {AddProjectComponent} from './components/add-project/add-project.component';
import {AddIssueComponent} from './components/add-issue/add-issue.component';
import {LoginComponent} from './layout/auth/login/login.component';
import {authGuard} from './guards/auth.guard';
import {IssuesComponent} from './layout/issues/issues.component';
import {SecuredAreaComponent} from './layout/secured-area/secured-area.component';

export const routes: Routes = [
    {
        path: '',
        component: SecuredAreaComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: IssuesComponent
            },
            {
                path: 'projects',
                component: ProjectsComponent,
                children: [
                    {
                        path: 'new',
                        component: AddProjectComponent
                    }
                ]
            },
            {
                path: 'new',
                component: AddIssueComponent
            }
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'sign-in',
                component: LoginComponent
            }
        ]
    }
];
