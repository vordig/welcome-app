import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IIssue} from '../interfaces/issue.interface';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private readonly _http = inject(HttpClient);

  private readonly _apiPath = '/api/v1.0/issues';

  public getIssues(projectId: string): Observable<IIssue[]> {
    return this._http.get<IIssue[]>(`${this._apiPath}/${projectId}`);
  }
}
