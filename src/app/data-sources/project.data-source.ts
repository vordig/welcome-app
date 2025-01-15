import {inject} from '@angular/core';
import {Observable} from 'rxjs';
import {IProject} from '../interfaces/project.interface';
import {ProjectService} from '../services/project.service';
import {BaseDataSource} from './base.data-source';

export class ProjectDataSource extends BaseDataSource<IProject> {

  private readonly _projectService = inject(ProjectService);

  protected override getData(): Observable<IProject[]> {
    return this._projectService.getProjects();
  }
}
