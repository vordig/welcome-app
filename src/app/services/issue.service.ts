import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {IIssue} from '../interfaces/issue.interface';
import {IIssueRequest} from '../interfaces/requests/issue-request.interface';
import {IPageRequest} from '../interfaces/requests/page-request';
import {ISortRequest} from '../interfaces/requests/sort-request';
import {IProjectFilterRequest} from '../interfaces/requests/project/project-filter-request';
import {IPageResponse} from '../interfaces/responses/page-response';
import {IProjectResponse} from '../interfaces/responses/project/project-response';
import {IIssueFilterRequest} from '../interfaces/requests/project/issue-filter-request';
import {IIssueListResponse} from '../interfaces/responses/project/issue-list-response';

@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private readonly _http = inject(HttpClient);

    private readonly _apiPath = '/api/v1.0/issues';

    public getIssues(pageRequest?: IPageRequest, sortRequest?: ISortRequest, filterRequest?: IIssueFilterRequest):
        Observable<IPageResponse<IIssueListResponse>> {

        let params = new HttpParams();

        if (!!pageRequest) {
            params = params.append("pageNumber", pageRequest.pageNumber);
            params = params.append("pageSize", pageRequest.pageSize);
        }

        if (!!sortRequest) {
            params = params.append("sortBy", sortRequest.sortBy);
            params = params.append("sortDir", sortRequest.sortDir);
        }

        if (!!filterRequest) {
            if (!!filterRequest.searchTerm) {
                params = params.append("searchTerm", filterRequest.searchTerm);
            }
            if (!!filterRequest.state) {
                params = params.append("state", filterRequest.state);
            }
            if (!!filterRequest.priorities) {
                filterRequest.priorities.forEach(priority => {
                    params = params.append("priority", priority);
                })
            }
            if (!!filterRequest.projectIds) {
                filterRequest.projectIds.forEach(priority => {
                    params = params.append("projectId", priority);
                })
            }
        }

        return this._http.get<IPageResponse<IIssueListResponse>>(this._apiPath, {params: params});
    }

    public createIssue(projectId: string, request: IIssueRequest): Observable<IIssue> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.post<IIssue>(`${this._apiPath}/${projectId}`, JSON.stringify(request), {headers: headers});
    }
}
