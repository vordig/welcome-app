import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProject} from '../interfaces/project.interface';
import {IProjectRequest} from '../interfaces/requests/project-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly _http = inject(HttpClient);

  private readonly _apiPath = '/api/v1.0/projects';

  public getProjects(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this._apiPath);
  }

  public createProject(request: IProjectRequest): Observable<IProject> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post<IProject>(this._apiPath, JSON.stringify(request), {headers: headers});
  }
}
