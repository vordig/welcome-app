import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IIssue} from '../interfaces/issue.interface';
import {IIssueRequest} from '../interfaces/requests/issue-request.interface';

@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private readonly _http = inject(HttpClient);

    private readonly _apiPath = '/api/v1.0/issues';

    public getIssues(projectId: string): Observable<IIssue[]> {
        return this._http.get<IIssue[]>(`${this._apiPath}/${projectId}`);
    }

    public createIssue(projectId: string, request: IIssueRequest): Observable<IIssue> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.post<IIssue>(`${this._apiPath}/${projectId}`, JSON.stringify(request), {headers: headers});
    }
}
